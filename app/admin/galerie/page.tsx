'use client';
import { useState, useEffect, useCallback } from 'react';

type GalleryFile = { name: string; sha: string };

async function resizeImage(file: File, maxWidth = 1600, quality = 0.85): Promise<{ base64: string; filename: string }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const base64 = dataUrl.split(',')[1];
      const safeName = file.name
        .replace(/[^a-zA-Z0-9._-]/g, '-')
        .replace(/\.[^.]+$/, '.jpg');
      const filename = `${Date.now()}-${safeName}`;
      resolve({ base64, filename });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function AdminGalleryPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [files, setFiles] = useState<GalleryFile[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-password': password,
  }), [password]);

  const loadFiles = useCallback(async () => {
    const res = await fetch('/api/admin/gallery', { headers: headers() });
    if (res.status === 401) { setAuthed(false); return; }
    const data = await res.json();
    setFiles(data.files || []);
    setSelected(new Set());
  }, [headers]);

  const handleLogin = async () => {
    const res = await fetch('/api/admin/gallery', {
      headers: { 'x-admin-password': password },
    });
    if (res.ok) {
      setAuthed(true);
      sessionStorage.setItem('admin_pw', password);
      const data = await res.json();
      setFiles(data.files || []);
    } else {
      setStatus('Mot de passe incorrect');
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const imageFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setUploading(true);
    setStatus(`Upload de ${imageFiles.length} image(s)…`);

    let success = 0;
    for (const file of imageFiles) {
      try {
        const { base64, filename } = await resizeImage(file);
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ filename, content: base64 }),
        });
        if (res.ok) success++;
      } catch (e) {
        console.error('Upload failed:', file.name, e);
      }
    }

    setStatus(`${success}/${imageFiles.length} image(s) uploadée(s). Déploiement en cours (~1 min).`);
    setUploading(false);
    loadFiles();
  };

  const toggleSelect = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === files.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(files.map(f => f.name)));
    }
  };

  const handleBatchDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Supprimer ${selected.size} image(s) ?`)) return;

    setDeleting(true);
    setStatus(`Suppression de ${selected.size} image(s)…`);

    const filesToDelete = files
      .filter(f => selected.has(f.name))
      .map(f => ({ filename: f.name, sha: f.sha }));

    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ files: filesToDelete }),
    });

    if (res.ok) {
      setFiles(prev => prev.filter(f => !selected.has(f.name)));
      setSelected(new Set());
      setStatus(`${filesToDelete.length} image(s) supprimée(s). Déploiement en cours.`);
    } else {
      setStatus('Erreur lors de la suppression.');
    }
    setDeleting(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed && password) loadFiles();
  }, [authed, password, loadFiles]);

  // Password gate
  if (!authed) {
    return (
      <main className="page-centered">
        <div className="text-center">
          <h1>Admin — Galerie</h1>
          <div className="form-flow" style={{ maxWidth: '300px', margin: '2rem auto' }}>
            <input
              type="password"
              className="form-input"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={handleLogin} className="btn btn-gradient">
              Connexion
            </button>
            {status && <p className="text-small text-muted">{status}</p>}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="page-header">
        <div className="container">
          <h1>Admin — Galerie</h1>
          <p>{files.length} photo(s) en ligne</p>
        </div>
      </section>

      <section className="section">
        <div className="container-mid">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = 'image/*';
              input.onchange = () => input.files && handleFiles(input.files);
              input.click();
            }}
            style={{
              border: `2px dashed ${dragOver ? '#667eea' : '#d1d5db'}`,
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: uploading ? 'wait' : 'pointer',
              background: dragOver ? '#f5f3ff' : '#f9fafb',
              transition: 'all 0.2s',
              marginBottom: '2rem',
              opacity: uploading ? 0.6 : 1,
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📸</div>
            <p className="text-large">
              {uploading ? 'Upload en cours…' : 'Glissez vos photos ici'}
            </p>
            <p className="text-small text-muted">
              ou cliquez pour sélectionner — redimensionnées automatiquement à 1600px
            </p>
          </div>

          {status && (
            <div className="alert alert-success mb-lg">{status}</div>
          )}

          {/* Toolbar */}
          {files.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selected.size === files.length}
                  onChange={selectAll}
                />
                Tout sélectionner ({selected.size}/{files.length})
              </label>
              {selected.size > 0 && (
                <button
                  onClick={handleBatchDelete}
                  disabled={deleting}
                  className="btn btn-outline"
                  style={{ color: '#dc2626', borderColor: '#dc2626' }}
                >
                  {deleting ? 'Suppression…' : `Supprimer (${selected.size})`}
                </button>
              )}
            </div>
          )}

          {/* Thumbnail grid */}
          <div data-no-lightbox className="masonry-grid">
            {(() => {
              const cols = 4;
              const columns: GalleryFile[][] = Array.from({ length: cols }, () => []);
              for (let i = 0; i < files.length; i++) {
                columns[i % cols].push(files[i]);
              }
              return columns.map((col, i) => (
                <div key={i} className="masonry-column">
                  {col.map((file) => (
                    <div
                      key={file.name}
                      className="masonry-item"
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        outline: selected.has(file.name) ? '3px solid #667eea' : 'none',
                        outlineOffset: '-3px',
                      }}
                      onClick={() => toggleSelect(file.name)}
                    >
                      <img
                        src={`/api/admin/gallery/image?file=${encodeURIComponent(file.name)}`}
                        alt={file.name}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={selected.has(file.name)}
                          onChange={() => toggleSelect(file.name)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </main>
  );
}