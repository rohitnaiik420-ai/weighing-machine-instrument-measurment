import React from 'react';
import { Check } from 'lucide-react';
import { LIFECYCLE_STAGES } from '../../utils/constants';

const StepperTracker = ({ currentStep, status }) => {
  const stages = LIFECYCLE_STAGES;

  return (
    <div className="w-full py-4">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center">
        <p className="text-sm font-medium text-navy-600 mb-1">Step {currentStep} of {stages.length}</p>
        <p className="text-base font-semibold text-gray-900">
          {stages.find(s => (s.step || s.id) === currentStep)?.label || 'Current Stage'}
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between relative px-6">
        <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0 rounded"></div>
        <div 
          className="absolute left-8 top-1/2 transform -translate-y-1/2 h-1 bg-navy-600 z-0 transition-all duration-300 rounded"
          style={{ width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (stages.length - 1)) * 100))}%`, maxWidth: 'calc(100% - 4rem)' }}
        ></div>
        
        {stages.map((stage) => {
          const stepNum = stage.step || stage.id;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isFuture = stepNum > currentStep;
          
          return (
            <div key={stage.key || stepNum} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                ${isCompleted ? 'bg-navy-600 border-navy-600 text-white' : ''}
                ${isCurrent ? 'border-brand-blue bg-brand-blue text-white shadow-md ring-2 ring-blue-200' : ''}
                ${isFuture ? 'border-gray-300 bg-white text-gray-500' : ''}
              `}>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-semibold">
                    {stepNum}
                  </span>
                )}
              </div>
              <div className="mt-2 w-20 text-center">
                <span className={`text-[11px] leading-tight block ${isCurrent ? 'font-bold text-brand-blue' : isCompleted ? 'font-medium text-navy-700' : 'text-gray-400'}`}>
                  {stage.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperTracker;
