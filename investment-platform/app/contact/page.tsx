import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | ArthCalc',
  description: 'Contact ArthCalc — report a bug, suggest a feature, or send feedback about our investment calculators.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-primary-200">Questions, feedback, or bug reports — we&apos;d love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--primary-500)' }} />
            <h3 className="font-bold text-text-primary mb-1">Email</h3>
            <p className="text-sm text-text-secondary">hello@arthcalc.in</p>
          </div>
          <div className="card p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--primary-500)' }} />
            <h3 className="font-bold text-text-primary mb-1">Feedback</h3>
            <p className="text-sm text-text-secondary">Feature requests welcome</p>
          </div>
          <div className="card p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--primary-500)' }} />
            <h3 className="font-bold text-text-primary mb-1">Response Time</h3>
            <p className="text-sm text-text-secondary">Within 2-3 business days</p>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Send Us a Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Your Name</label>
              <input type="text" placeholder="Ravi Sharma"
                className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': 'var(--primary-500)' } as React.CSSProperties} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input type="email" placeholder="ravi@example.com"
                className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': 'var(--primary-500)' } as React.CSSProperties} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
              <select className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': 'var(--primary-500)' } as React.CSSProperties}>
                <option>Bug report — calculator giving wrong result</option>
                <option>Feature request — new calculator</option>
                <option>Rate update — an interest rate is outdated</option>
                <option>General feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
              <textarea rows={5} placeholder="Describe your bug, feedback, or question in detail..."
                className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{ '--tw-ring-color': 'var(--primary-500)' } as React.CSSProperties} />
            </div>
            <button
              className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
            >
              Send Message
            </button>
            <p className="text-xs text-text-muted text-center">
              Note: ArthCalc does not provide personalized investment advice. For investment questions, please consult a SEBI-registered advisor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
