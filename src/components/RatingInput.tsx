import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  criterionId: string;
  label: string;
  description: string;
  value: number; // 0 to 5 (0 means unselected)
  onChange: (val: number) => void;
}

const RATING_LEVELS: { score: number; text: string; subtext: string }[] = [
  { score: 1, text: "Poor", subtext: "Significantly below expectations" },
  { score: 2, text: "Fair", subtext: "Needs notable improvement" },
  { score: 3, text: "Good", subtext: "Meets curriculum standards" },
  { score: 4, text: "Very Good", subtext: "Consistent & thorough delivery" },
  { score: 5, text: "Excellent", subtext: "Exceptional mastery & support" },
];

export const RatingInput: React.FC<RatingInputProps> = ({
  criterionId,
  label,
  description,
  value,
  onChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const activeLevel = hovered ?? value;
  const activeRatingInfo = RATING_LEVELS.find((r) => r.score === activeLevel);

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 transition-all hover:bg-slate-50 hover:border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 leading-snug">
            {label}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Selected badge status */}
        {value > 0 ? (
          <span className="shrink-0 self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            {value} / 5 • {RATING_LEVELS[value - 1]?.text}
          </span>
        ) : (
          <span className="shrink-0 self-start inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Required *
          </span>
        )}
      </div>

      {/* Interactive Rating Pills */}
      <div className="pt-2">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {RATING_LEVELS.map((level) => {
            const isSelected = value === level.score;
            const isHighlighted = hovered !== null && level.score <= hovered;

            return (
              <button
                key={level.score}
                type="button"
                onClick={() => onChange(level.score)}
                onMouseEnter={() => setHovered(level.score)}
                onMouseLeave={() => setHovered(null)}
                className={`py-2 px-1 sm:px-2 rounded-lg text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm ring-2 ring-orange-200'
                    : isHighlighted
                    ? 'bg-orange-50 text-orange-800 border-orange-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Star
                    className={`w-3.5 h-3.5 ${
                      isSelected
                        ? 'fill-white text-white'
                        : isHighlighted
                        ? 'fill-orange-400 text-orange-400'
                        : 'text-slate-300'
                    }`}
                  />
                  <span className="text-xs font-bold">{level.score}</span>
                </div>
                <span
                  className={`text-[10px] hidden sm:block truncate w-full ${
                    isSelected ? 'text-orange-100 font-medium' : 'text-slate-500'
                  }`}
                >
                  {level.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic feedback caption */}
        {activeRatingInfo && (
          <p className="text-[11px] text-slate-500 mt-2 italic flex items-center gap-1">
            <span className="font-medium text-slate-700">{activeRatingInfo.text}:</span>
            <span>{activeRatingInfo.subtext}</span>
          </p>
        )}
      </div>
    </div>
  );
};

