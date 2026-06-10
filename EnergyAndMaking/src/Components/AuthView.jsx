import { useState } from "react";
import { useAuth } from "./Useauth";

function AuthView({ onLogin, onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", password2: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    
    if (!loginForm.email.includes("@")) {
      setError("Correo inválido.");
      setIsLoading(false);
      return;
    }
    if (loginForm.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    const { error: err } = await login(loginForm.email, loginForm.password);
    setIsLoading(false);
    
    if (err) {
      setError(err.message || "Correo o contraseña incorrectos.");
    } else {
      onLoginSuccess?.();
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!regForm.name.trim()) return setError("Ingresa tu nombre.");
    if (!regForm.email.includes("@")) return setError("Correo inválido.");
    if (regForm.password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (regForm.password !== regForm.password2) return setError("Las contraseñas no coinciden.");

    setIsLoading(true);
    const { error: err } = await register(regForm.name, regForm.email, regForm.password);
    setIsLoading(false);

    if (err) {
      setError(err.message || "Error al registrarse.");
    } else {
      onLoginSuccess?.();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card_title">Bienvenido</div>
        <div className="auth-card_sub">Accede a tu cuenta o crea una nueva</div>

        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login" ? " active" : ""}`} onClick={() => { setTab("login"); setError(""); }}>
            Iniciar sesión
          </button>
          <button className={`auth-tab${tab === "register" ? " active" : ""}`} onClick={() => { setTab("register"); setError(""); }}>
            Registrarse
          </button>
        </div>

        {tab === "login" ? (
          <>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" placeholder="tu@correo.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            {error && <div className="form-error" style={{ marginBottom: 12 }}>{error}</div>}
            <button className="btn btn-yellow btn-full" onClick={handleLogin} disabled={isLoading}>
              <i className="bx bx-log-in" /> {isLoading ? "Procesando..." : "Iniciar sesión"}
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input className="form-input" placeholder="Juan Pérez"
                value={regForm.name}
                onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" placeholder="tu@correo.com"
                value={regForm.email}
                onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input className="form-input" type="password" placeholder="Mínimo 6 caracteres"
                value={regForm.password}
                onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <input className="form-input" type="password" placeholder="Repetir contraseña"
                value={regForm.password2}
                onChange={(e) => setRegForm((f) => ({ ...f, password2: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()} />
            </div>
            {error && <div className="form-error" style={{ marginBottom: 12 }}>{error}</div>}
            <button className="btn btn-yellow btn-full" onClick={handleRegister} disabled={isLoading}>
              <i className="bx bx-user-plus" /> {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthView;
