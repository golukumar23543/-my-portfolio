import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform">
      <MessageCircle size={28} />
    </a>
  );
}
