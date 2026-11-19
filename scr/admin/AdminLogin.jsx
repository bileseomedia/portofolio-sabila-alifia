import React, { useState } from 'react';
import { Lock, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AdminLogin = ({ onSuccess, onNotify }) => {
  const { loginWithPassword, registerAdmin, isConfigured } = useAuth();
  const { isDark } = useTheme();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demoPasscode, setDemoPasscode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!isConfigured) {
        // Demo Passcode login
        await loginWithPassword('', demoPasscode);
        onNotify('Masuk dalam mode Studio Demo (passcode terverifikasi).');
        onSuccess();
      } else {
        if (isRegisterMode) {
          await registerAdmin(email, password);
          onNotify('Registrasi admin berhasil! Silakan periksa email untuk konfirmasi.');
          setIsRegisterMode(false);
        } else {
          await loginWithPassword(email, password);
          onNotify('Selamat datang kembali, Admin.');
          onSuccess();
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal masuk. Periksa kembali informasi Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
          isDark ? 'bg-[#202F46] text-[#C5A56A]' : 'bg-[#F3DDE3] text-[#2C2520]'
        }`}
      >
        <Lock className="w-7 h-7" />
      </div>

      <h4 className="font-editorial text-3xl font-semibold mb-2">
        {isConfigured
          ? isRegisterMode
            ? 'Buat Akun Admin'
            : 'Admin Studio Login'
          : 'Studio Admin Access'}
      </h4>

      <p className={`text-sm mb-6 ${isDark ? 'text-[#C7CED8]' : 'text-[#5A514B]'}`}>
        {isConfigured
          ? 'Masuk menggunakan akun Supabase Admin untuk mengelola seluruh konten dan media.'
          : 'Supabase belum dihubungkan. Anda dapat mencoba mode demo dengan passcode SABILA2025.'}
      </p>

      {!isConfigured && (
        <div className={`w-full mb-6 p-4 rounded-2xl border text-left flex items-start gap-3 ${
          isDark ? 'bg-[#202F46] border-[#C5A56A]/40 text-[#D8C49A]' : 'bg-[#FAF0D8] border-[#F5E9BE] text-[#2C2520]'
        }`}>
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold">Mode Uji Coba (Offline / Prototype)</p>
            <p>Masukkan passcode default: <span className="font-mono font-bold">SABILA2025</span> untuk menguji editing dan pratinjau sebelum Supabase dikonfigurasi.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full mb-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {isConfigured ? (
          <>
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Admin"
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#202F46] border-[#293A52] text-[#E1E5EB]'
                    : 'bg-[#FFF9F0] border-[#CFE3F2] text-[#2C2520]'
                }`}
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#202F46] border-[#293A52] text-[#E1E5EB]'
                    : 'bg-[#FFF9F0] border-[#CFE3F2] text-[#2C2520]'
                }`}
              />
            </div>
          </>
        ) : (
          <div>
            <input
              type="password"
              required
              value={demoPasscode}
              onChange={(e) => setDemoPasscode(e.target.value)}
              placeholder="Masukkan Passcode (SABILA2025)"
              className={`w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none ${
                isDark
                  ? 'bg-[#202F46] border-[#293A52] text-[#E1E5EB]'
                  : 'bg-[#FFF9F0] border-[#CFE3F2] text-[#2C2520]'
              }`}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all disabled:opacity-50 ${
            isDark
              ? 'bg-[#C5A56A] text-[#17243A] hover:bg-[#D8C49A]'
              : 'bg-[#2C2520] text-[#FFF9F0] hover:bg-opacity-90'
          }`}
        >
          {isSubmitting
            ? 'Memproses...'
            : isConfigured
              ? isRegisterMode ? 'Daftar Akun Admin' : 'Masuk ke Supabase'
              : 'Buka Studio Admin'}
        </button>

        {isConfigured && (
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError('');
            }}
            className="text-xs underline text-center block w-full mt-2 opacity-75 hover:opacity-100"
          >
            {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun admin? Buat akun'}
          </button>
        )}
      </form>
    </div>
  );
};
