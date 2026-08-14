import { useState } from 'react';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { addFeedback } from '../lib/api';
import { auth } from '../lib/firebase';

export default function ProductFeedbackModal({ productTitle, onClose }: { productTitle: string, onClose: () => void }) {
  const [feedbackText, setFeedbackText] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = evt.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        setImage(compressedBase64);
      });
    }
  };

  const handleSubmit = async () => {
    if (!feedbackText) return;
    setIsSubmitting(true);
    const user = auth.currentUser;
    const feedbackPayload = {
      name: user ? user.displayName || 'Anonymous User' : 'Anonymous User',
      email: user ? user.email || '' : '',
      feedback: `[${productTitle}] ${feedbackText}`,
      image_url: image
    };

    try {
      await addFeedback(feedbackPayload);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch(err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-secondary-dark border border-white/10 rounded-3xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={64} className="text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Leave Feedback</h3>
            <p className="text-accent-blue text-sm font-semibold mb-6">For: {productTitle}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Review / Feedback</label>
                <textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full h-32 bg-primary-dark border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-accent-blue transition-colors"
                  placeholder="Tell us what you think..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Attach an Image (Optional)</label>
                <div className="border-2 border-dashed border-white/20 hover:border-accent-blue transition-colors rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer relative" onClick={() => document.getElementById('feedback-img-upload')?.click()}>
                  <input type="file" id="feedback-img-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  {image ? (
                    <img src={image} className="h-32 w-auto object-cover rounded-lg" alt="Selected" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <Upload size={24} className="mb-2" />
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={handleSubmit} 
                disabled={!feedbackText || isSubmitting}
                className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
