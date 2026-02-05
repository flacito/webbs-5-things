import { X, Mail, CheckCircle, Clock, Users, Zap } from "lucide-react";

interface SeminarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SeminarModal({ isOpen, onClose }: SeminarModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-gh-bg border border-gh-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - sticky */}
        <div className="sticky top-0 z-10 p-6 pb-4 border-b border-gh-border bg-gh-bg rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gh-bg-secondary transition-colors text-gh-text/70 hover:text-gh-text"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gh-heading">
            The 5 Things Seminar
          </h2>
          <p className="text-gh-text/70 mt-1">
            Skip the trial and error. Get direct mentorship to launch.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gh-accent/10 text-gh-accent font-semibold">
            $7,000/day
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Value Props */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gh-bg-secondary/50">
              <Clock className="text-gh-green mt-0.5" size={18} />
              <div>
                <p className="font-medium text-gh-heading text-sm">8 Hours</p>
                <p className="text-xs text-gh-text/70">Focused mentorship</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gh-bg-secondary/50">
              <Zap className="text-gh-yellow mt-0.5" size={18} />
              <div>
                <p className="font-medium text-gh-heading text-sm">50x Velocity</p>
                <p className="text-xs text-gh-text/70">On every future project</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gh-bg-secondary/50">
              <Users className="text-gh-link mt-0.5" size={18} />
              <div>
                <p className="font-medium text-gh-heading text-sm">1-3 Sessions</p>
                <p className="text-xs text-gh-text/70">Context to launch</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gh-bg-secondary/50">
              <Mail className="text-gh-accent mt-0.5" size={18} />
              <div>
                <p className="font-medium text-gh-heading text-sm">30 Days</p>
                <p className="text-xs text-gh-text/70">Async follow-up</p>
              </div>
            </div>
          </div>

          {/* Day Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-gh-heading mb-3">
              Your Day, Hour by Hour
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-gh-accent pl-4">
                <p className="font-medium text-gh-heading">Hour 1: The 5 Things with YOUR Prompt</p>
                <p className="text-sm text-gh-text/80 mt-1">
                  We start with your actual project. You bring context, we establish your high-level vision together.
                  I watch you interact with Claude and coach in real-time.
                </p>
                <p className="text-xs text-gh-green mt-2 font-medium">
                  You leave with a complete design session artifact
                </p>
              </div>

              <div className="border-l-2 border-gh-yellow pl-4">
                <p className="font-medium text-gh-heading">Hours 2-4: Design Sessions for Your Architecture</p>
                <ul className="text-sm text-gh-text/80 mt-1 space-y-1">
                  <li>• Architecture decisions - I push back on assumptions</li>
                  <li>• Technical deep-dives - Solve hard problems together</li>
                  <li>• Pattern recognition - My daily patterns across domains</li>
                  <li>• Live implementation - Watch me go big with your codebase</li>
                </ul>
              </div>

              <div className="border-l-2 border-gh-green pl-4">
                <p className="font-medium text-gh-heading">Hours 5-8: From Design to Launch</p>
                <ul className="text-sm text-gh-text/80 mt-1 space-y-1">
                  <li>• Implementation sprint - You drive, I coach, Claude builds</li>
                  <li>• Production hardening - Error handling, edge cases, security</li>
                  <li>• Deployment pipeline - CI/CD, environment config, docs</li>
                  <li>• Handoff preparation - You're ready to continue solo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What You Leave With */}
          <div className="bg-gh-bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold text-gh-heading mb-3">What You Leave With</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-gh-green mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gh-text">Complete design session documentation for your project</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-gh-green mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gh-text">Working prototype or MVP deployed to staging</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-gh-green mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gh-text">Your own rails documented and established</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-gh-green mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gh-text">Confidence to run design sessions independently</p>
              </div>
            </div>
          </div>

          {/* Good Fit */}
          <div>
            <h3 className="font-semibold text-gh-heading mb-2">Good Fit</h3>
            <ul className="text-sm text-gh-text/80 space-y-1">
              <li>• Technical founders building their first AI-assisted product</li>
              <li>• Engineering leads who want to transform team velocity</li>
              <li>• Experienced developers ready to 10x their output</li>
              <li>• Anyone with a real project and a deadline</li>
            </ul>
          </div>
        </div>

        {/* Footer - sticky */}
        <div className="sticky bottom-0 z-10 p-6 pt-4 border-t border-gh-border bg-gh-bg rounded-b-2xl">
          <a
            href="mailto:brian@kingslandacademy.com?subject=5 Things Seminar - [Your Project]&body=Hi Brian,%0D%0A%0D%0AI'm interested in the 5 Things Seminar.%0D%0A%0D%0AWhat I'm building:%0D%0A%0D%0AWhere I'm stuck:%0D%0A%0D%0AMy timeline:%0D%0A"
            className="block w-full py-3 px-4 bg-gh-accent hover:bg-gh-accent/90 text-white font-medium rounded-lg text-center transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <Mail size={18} />
              Book Your Session
            </span>
          </a>
          <p className="text-xs text-gh-text/60 text-center mt-3">
            Remote via video call (default) • In-person available in Raleigh-Durham (+travel)
          </p>
        </div>
      </div>
    </div>
  );
}
