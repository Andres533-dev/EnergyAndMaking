import { useState } from "react";
import { CATEGORIES } from "./categories";
import { uploadProductImage } from "./Storageservice";

function ProductModal({ initial, onSave, onClose, userId }) {
  // Normaliza el objeto initial para evitar undefined y convertir price a string
  const getNormalizedInitial = () => {
    if (!initial) {
      return {
        title: "",
        desc: "",
        price: "",
        category_id: CATEGORIES[0].id,
        imageUrl: "",
      };
    }
    return {
      title: initial.title ?? "",
      desc: initial.desc ?? "",
      price: initial.price !== undefined ? String(initial.price) : "",
      category_id: initial.category_id ?? CATEGORIES[0].id,
      imageUrl: initial.imageUrl ?? "",
    };
  };

  const [form, setForm] = useState(getNormalizedInitial);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(initial?.imageUrl || "");
  const [uploading, setUploading] = useState(false);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUploading(true);
    setError("");

    try {
      const publicUrl = await uploadProductImage(file, userId);
      setField("imageUrl", publicUrl);
    } catch (err) {
      setError(`Error al subir imagen: ${err.message}`);
      setPreviewUrl(initial?.imageUrl || "");
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSave = () => {
    console.log('Guardando producto con imageUrl:', form.imageUrl);
    if (!form.title.trim()) return setError("El nombre del producto es obligatorio.");
    const priceNumber = Number(form.price);
    if (isNaN(priceNumber) || priceNumber <= 0)
      return setError("Ingresa un precio válido mayor a 0.");
    setError("");
    onSave({ ...form, price: priceNumber });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal_header">
          <div className="modal_title">{initial ? "Editar producto" : "Nuevo producto"}</div>
          <button className="modal_close" onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Nombre del producto *</label>
          <input
            className="form-input"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Ej: Taladro percutor 13mm"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categoría *</label>
          <select
            className="form-select"
            value={form.category_id}
            onChange={(e) => setField("category_id", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-textarea"
            value={form.desc}
            onChange={(e) => setField("desc", e.target.value)}
            placeholder="Descripción breve del producto..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Precio (COP) *</label>
          <input
            className="form-input"
            type="number"
            min="1"
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
            placeholder="Ej: 85000"
          />
        </div>

        {/* Subida de imagen local */}
        <div className="form-group">
          <label className="form-label">Imagen del producto</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="form-input"
            style={{ padding: "6px" }}
            disabled={uploading}
          />
          {uploading && (
            <div className="form-hint" style={{ color: "var(--yellow)" }}>
              Subiendo imagen...
            </div>
          )}
        </div>

        {/* URL manual (alternativa) */}
        <div className="form-group">
          <label className="form-label">O URL de imagen (alternativa)</label>
          <input
            className="form-input"
            value={form.imageUrl}
            onChange={(e) => {
              setField("imageUrl", e.target.value);
              setPreviewUrl(e.target.value);
            }}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <div className="form-hint">
            Puedes subir un archivo local o pegar una URL directa.
          </div>
        </div>

        {/* Vista previa */}
        {previewUrl && (
          <div className="form-group">
            <label className="form-label">Vista previa</label>
            <div style={{ width: "100%", maxHeight: "160px", overflow: "hidden", borderRadius: "8px" }}>
              <img src={previewUrl} alt="Vista previa" style={{ width: "100%", objectFit: "cover" }} />
            </div>
          </div>
        )}

        {error && <div className="form-error">{error}</div>}

        <div className="modal_actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-yellow" onClick={handleSave} disabled={uploading}>
            <i className="bx bx-check" /> {initial ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;