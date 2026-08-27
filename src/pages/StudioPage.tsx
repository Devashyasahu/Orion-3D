import React from 'react';
import { motion } from 'framer-motion';
import { STUDIO_STEPS } from '../data/studio';

export const StudioPage: React.FC = () => {
  return (
    <div className="studio-journal min-h-screen pt-32 pb-28 relative overflow-hidden">
      <section className="studio-journal__hero">
        <div className="studio-journal__copy">
          <span>ORION STUDIO / HUMAN CRAFT</span>
          <h1>
            BUILT DIGITAL.<br />
            FINISHED BY HAND.
          </h1>
          <p>
            The collectible leaves the screen here. Resin, sanding, primer, paint, inspection, and human patience turn a digital figure into an object with presence.
          </p>
        </div>
        <div className="studio-journal__hero-image">
          <img src="/images/studio_finishing.png" alt="Finished Orion figure in the workshop" />
        </div>
      </section>

      <section className="studio-journal__statement">
        <p>Machines create the form. Hands give it character.</p>
      </section>

      <section className="studio-journal__process">
        {STUDIO_STEPS.map((stepItem, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <motion.article
              key={stepItem.step}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65 }}
              className={`studio-journal-step ${isReverse ? 'studio-journal-step--reverse' : ''}`}
            >
              <div className="studio-journal-step__media">
                <img src={stepItem.image} alt={stepItem.title} loading="lazy" />
              </div>
              <div className="studio-journal-step__copy">
                <span>{stepItem.step} / {stepItem.tagline}</span>
                <h2>{stepItem.title}</h2>
                <p>{stepItem.description}</p>
                <ul>
                  {stepItem.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
};
