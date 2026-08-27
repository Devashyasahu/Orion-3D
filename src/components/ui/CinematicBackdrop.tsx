import React from 'react';

export const CinematicBackdrop: React.FC = () => {
  return (
    <div className="orion-backdrop" aria-hidden="true">
      <div className="orion-backdrop__sky" />
      <div className="orion-backdrop__rays" />
      <div className="orion-backdrop__stage" />
      <div className="orion-backdrop__dust" />
      <div className="orion-backdrop__grain" />
    </div>
  );
};
