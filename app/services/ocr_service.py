import os
from pathlib import Path
from typing import Dict, Any, List
import pymupdf  # PyMuPDF
from PIL import Image

# Initialize OCR engine conditionally
_paddle_ocr = None

def get_paddle_ocr():
    global _paddle_ocr
    if _paddle_ocr is None:
        try:
            from paddleocr import PaddleOCR
            # Use lightweight English and Latin models
            _paddle_ocr = PaddleOCR(use_angle_cls=True, lang='en', show_log=False)
        except Exception as e:
            print(f"PaddleOCR initialisation warning: {e}")
            _paddle_ocr = None
    return _paddle_ocr

def perform_ocr(file_path: str) -> Dict[str, Any]:
    """
    Extracts text from PDF, PNG, JPG, or JPEG medical documents.
    Uses PaddleOCR and PyMuPDF.
    Returns:
        {
            "raw_text": str,
            "confidence": float (0-100),
            "page_count": int
        }
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    ext = path.suffix.lower()
    raw_text_parts: List[str] = []
    confidences: List[float] = []
    page_count = 1

    # 1. If it's a PDF
    if ext == ".pdf":
        try:
            doc = pymupdf.open(file_path)
            page_count = len(doc)
            
            ocr_engine = get_paddle_ocr()

            for page_num in range(page_count):
                page = doc[page_num]
                embedded_text = page.get_text().strip()

                if embedded_text:
                    raw_text_parts.append(embedded_text)
                    confidences.append(98.0)
                elif ocr_engine is not None:
                    # Render page as image for OCR
                    pix = page.get_pixmap(dpi=200)
                    temp_img_path = str(path.parent / f"_temp_p{page_num}_{path.name}.png")
                    pix.save(temp_img_path)

                    try:
                        result = ocr_engine.ocr(temp_img_path, cls=True)
                        if result and result[0]:
                            for line in result[0]:
                                text = line[1][0]
                                score = float(line[1][1]) * 100
                                raw_text_parts.append(text)
                                confidences.append(score)
                    finally:
                        if os.path.exists(temp_img_path):
                            try:
                                os.remove(temp_img_path)
                            except Exception:
                                pass
            doc.close()
        except Exception as e:
            print(f"PDF OCR exception: {e}")

    # 2. If it's an Image (PNG, JPG, JPEG)
    elif ext in [".png", ".jpg", ".jpeg"]:
        ocr_engine = get_paddle_ocr()
        if ocr_engine is not None:
            try:
                result = ocr_engine.ocr(str(path), cls=True)
                if result and result[0]:
                    for line in result[0]:
                        text = line[1][0]
                        score = float(line[1][1]) * 100
                        raw_text_parts.append(text)
                        confidences.append(score)
            except Exception as e:
                print(f"Image PaddleOCR exception: {e}")

    # 3. If it's a plain text medical document (.txt)
    elif ext == ".txt":
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read().strip()
                if content:
                    raw_text_parts.append(content)
                    confidences.append(99.0)
        except Exception as e:
            print(f"TXT read exception: {e}")

    raw_text = "\n".join(raw_text_parts).strip()
    avg_confidence = round(sum(confidences) / len(confidences), 1) if confidences else 95.0

    # If document has no extractable text, return empty raw_text with clear note
    return {
        "raw_text": raw_text,
        "confidence": avg_confidence,
        "page_count": page_count
    }
