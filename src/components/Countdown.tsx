import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
  targetTime?: string;
}

const Countdown = ({ targetDate, targetTime = '00:00' }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const [hours, minutes] = targetTime.split(':').map(Number);
      const target = new Date(targetDate);
      target.setHours(hours, minutes, 0, 0);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="perspective-3d" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 md:gap-4"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Clock className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
        </motion.div>
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-wrap justify-center">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="perspective-3d" style={{ perspective: '1000px' }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { 
                  scale: 1.1,
                  rotateY: 10,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 300 }
                } : {}}
                style={{ transformStyle: 'preserve-3d' }}
                className="text-center"
              >
                <motion.div 
                  className="bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 min-w-[50px] sm:min-w-[60px] md:min-w-[70px] lg:min-w-[80px] border border-white/30 shadow-lg card-3d"
                  animate={{ 
                    boxShadow: [
                      "0 10px 30px rgba(0,0,0,0.3)",
                      "0 15px 40px rgba(217, 119, 68, 0.4)",
                      "0 10px 30px rgba(0,0,0,0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/90 mt-0.5 sm:mt-1 font-medium">
                {unit.label}
              </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Countdown;
