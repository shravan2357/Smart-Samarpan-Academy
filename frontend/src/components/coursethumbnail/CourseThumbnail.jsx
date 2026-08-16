import React, { useState } from "react";
import { server } from "../../main";
import "./CourseThumbnail.css";

// Local class-specific assets
import lec9th  from "../../assets/lec_9th.jpg";
import lec10th from "../../assets/lec_10th.jpg";
import lec11th from "../../assets/lec_11th.jpg";
import lec12th from "../../assets/lec_12th.jpg";

/* ── Category → gradient theme ─────────────────────────────── */
const getCategoryTheme = (category = "", title = "") => {
  const text = (category + " " + title).toLowerCase();
  if (text.includes("9th"))     return { gradient: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)", accent: "#64b5f6",  emoji: "🔵", label: "Class 9"   };
  if (text.includes("10th"))    return { gradient: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", accent: "#81c784",  emoji: "🟢", label: "Class 10"  };
  if (text.includes("11th"))    return { gradient: "linear-gradient(135deg, #e65100 0%, #bf360c 100%)", accent: "#ffb74d",  emoji: "🟠", label: "Class 11"  };
  if (text.includes("12th"))    return { gradient: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)", accent: "#ce93d8",  emoji: "🟣", label: "Class 12"  };
  if (text.includes("mains") || text.includes("jee"))
                                return { gradient: "linear-gradient(135deg, #c62828 0%, #7f0000 100%)", accent: "#ef9a9a",  emoji: "🔴", label: "JEE"        };
  if (text.includes("advanced"))return { gradient: "linear-gradient(135deg, #00695c 0%, #004d40 100%)", accent: "#80cbc4",  emoji: "⚡", label: "Advanced"  };
  if (text.includes("olympiad"))return { gradient: "linear-gradient(135deg, #f57f17 0%, #e65100 100%)", accent: "#fff176",  emoji: "🏆", label: "Olympiad"  };
  return                               { gradient: "linear-gradient(135deg, #263238 0%, #37474f 100%)", accent: "#90a4ae",  emoji: "🎓", label: "Course"     };
};

/* ── Local fallback image by class ─────────────────────────── */
const getLocalClassImage = (category = "", title = "") => {
  const text = (category + " " + title).toLowerCase();
  if (text.includes("9th"))  return lec9th;
  if (text.includes("10th")) return lec10th;
  if (text.includes("11th")) return lec11th;
  if (text.includes("12th")) return lec12th;
  return null;
};

/* ── Title Card (shown while loading OR as final fallback) ─── */
const TitleCard = ({ course, theme, className, style }) => (
  <div
    className={`crs-thumb-title-card ${className}`}
    style={{ background: theme.gradient, ...style }}
  >
    <div className="crs-thumb-circle crs-thumb-circle-1" />
    <div className="crs-thumb-circle crs-thumb-circle-2" />
    <div className="crs-thumb-circle crs-thumb-circle-3" />
    <div className="crs-thumb-content">
      <div className="crs-thumb-badge" style={{ background: theme.accent + "30", color: theme.accent }}>
        {theme.emoji} {theme.label}
      </div>
      <h3 className="crs-thumb-title">{course.title}</h3>
      {course.createdBy && (
        <p className="crs-thumb-by" style={{ color: theme.accent }}>
          by {course.createdBy}
        </p>
      )}
    </div>
    <div className="crs-thumb-shine" style={{ background: theme.accent }} />
  </div>
);

/* ── Image with loading state ───────────────────────────────── */
const ImageWithFallback = ({ src, course, theme, className, style, onError }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    onError && onError();
  };

  if (error) return null; // parent handle karega

  return (
    <>
      {/* Jab tak image load na ho → title card dikhao */}
      {!loaded && (
        <TitleCard course={course} theme={theme} className={className} style={style} />
      )}

      {/* Image hidden rakhte hain jab tak load na ho, phir fade-in */}
      <img
        src={src}
        alt={course.title}
        className={className}
        style={{ ...style, display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </>
  );
};

/* ── Main CourseThumbnail Component ─────────────────────────── */
const CourseThumbnail = ({ course, className = "", style = {} }) => {
  const [uploadedImgError, setUploadedImgError] = useState(false);
  const [localImgError,    setLocalImgError]    = useState(false);

  if (!course) return null;

  const theme = getCategoryTheme(course.category, course.title);

  // ── Step 1: Admin ne custom thumbnail upload ki → wahi dikhao
  let uploadedImageUrl = null;
  if (!uploadedImgError && course.image) {
    if (course.image.startsWith("http://") || course.image.startsWith("https://")) {
      uploadedImageUrl = course.image;
    } else if (server) {
      uploadedImageUrl = `${server}/${course.image}`;
    }
  }

  if (uploadedImageUrl) {
    return (
      <ImageWithFallback
        src={uploadedImageUrl}
        course={course}
        theme={theme}
        className={className}
        style={style}
        onError={() => setUploadedImgError(true)}
      />
    );
  }

  // ── Step 2: Local class image (lec_9th, lec_10th etc.)
  const localImage = getLocalClassImage(course.category, course.title);
  if (localImage && !localImgError) {
    return (
      <ImageWithFallback
        src={localImage}
        course={course}
        theme={theme}
        className={className}
        style={style}
        onError={() => setLocalImgError(true)}
      />
    );
  }

  // ── Step 3: Sirf title card dikhao (koi image nahi)
  return <TitleCard course={course} theme={theme} className={className} style={style} />;
};

export default CourseThumbnail;
