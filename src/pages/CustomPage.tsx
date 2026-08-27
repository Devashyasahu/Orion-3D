import React, { useState } from 'react';
import { Upload, Sparkles, CheckCircle2 } from 'lucide-react';

import { useCursor } from '../context/CursorContext';

export const CustomPage: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const [selectedPose, setSelectedPose] = useState('HEROIC LEAP');
  const [selectedFinish, setSelectedFinish] = useState('OBSIDIAN PATINA');
  const [selectedScale, setSelectedScale] = useState('28 CM (EXHIBITION)');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);

  const poses = ['HEROIC LEAP', 'COMBAT STANCE', 'FLOATING AURA', 'STUDIO PEDESTAL'];
  const finishes = ['OBSIDIAN PATINA', 'BRUSHED METAL', 'AURA RESIN', 'SATIN ENAMEL'];
  const scales = ['20 CM (COMPACT)', '28 CM (EXHIBITION)', '35 CM (APEX SCALE)'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPrepared(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-violet-900/15 blur-[200px] pointer-events-none" />

      <div className="custom-chamber max-w-7xl mx-auto px-6 md:px-12 space-y-24 relative z-10">
        <div className="custom-chamber__core" />
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-space tracking-[0.35em] text-violet-400 uppercase font-semibold">
            THE FORGE / BESPOKE SCULPTING
          </span>
          <h1 className="type-display-l font-syne uppercase text-white">
            WHAT IF YOUR CHARACTER COULD EXIST?
          </h1>
          <p className="text-sm md:text-lg font-space text-white/70 leading-relaxed">
            We transform your image or original concept into a museum-grade physical resin figure.
          </p>
        </div>

        {/* Visual Transformation Sequence */}
        <div className="forge-progress" aria-label="Forge progress">
          <span className={uploadedFile ? 'is-complete' : 'is-active'}>01 / Reference</span>
          <span className={selectedPose ? 'is-complete' : ''}>02 / Form</span>
          <span className={selectedFinish ? 'is-complete' : ''}>03 / Finish</span>
          <span className={uploadedFile ? 'is-active' : ''}>04 / Review</span>
        </div>

        <div className="creation-flow">
          <div className="creation-flow__node experience-panel p-8 space-y-4">
              <span className="text-xs font-space tracking-[0.3em] text-amber-300 font-semibold">STEP 01</span>
            <h3 className="text-2xl font-syne font-bold text-white">WHO ARE WE BRINGING TO LIFE?</h3>
            <p className="text-xs font-space text-white/50 leading-relaxed">
              Upload reference photographs, portrait, or original digital character concept.
            </p>
          </div>
          <div className="text-amber-300 text-3xl font-syne hidden md:block">→</div>
          <div className="creation-flow__node creation-flow__node--middle experience-panel p-8 space-y-4">
            <span className="text-xs font-space tracking-[0.3em] text-violet-400 font-semibold">STEP 02</span>
            <h3 className="text-2xl font-syne font-bold text-white">CHOOSE THE FORM</h3>
            <p className="text-xs font-space text-white/50 leading-relaxed">
              Our master sculptors model your anatomy, costume armor, and dynamic pose.
            </p>
          </div>
          <div className="text-violet-400 text-3xl font-syne hidden md:block">→</div>
          <div className="creation-flow__node experience-panel p-8 space-y-4">
            <span className="text-xs font-space tracking-[0.3em] text-pink-400 font-semibold">STEP 03</span>
            <h3 className="text-2xl font-syne font-bold text-white">DEFINE THE WORLD</h3>
            <p className="text-xs font-space text-white/50 leading-relaxed">
              SLA printed at 15-microns, hand micro-sanded, and painted in custom lacquer.
            </p>
          </div>
        </div>

        {/* Interactive Custom Figure Studio Preview & Inquiry */}
        <div className="custom-console">
          {/* Customization Options Left */}
          <div className="custom-console__controls space-y-8">
            <div>
              <span className="text-xs font-space tracking-[0.3em] text-violet-400 uppercase font-semibold">
                FORGE CONTROLS
              </span>
              <h2 className="type-section font-syne uppercase text-white mt-1">
                BUILD THE PROJECT DOSSIER
              </h2>
            </div>

            {/* Upload Reference Photo Box */}
            <div className="space-y-3">
              <label className="block text-xs font-space tracking-[0.2em] text-white/60 uppercase">
                REFERENCE PHOTO / AVATAR UPLOAD
              </label>
              <div className="upload-rift experience-panel relative p-8 text-center transition-colors group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {uploadedFile ? (
                  <div className="space-y-3">
                    <img src={uploadedFile} alt="Preview" className="w-24 h-24 object-cover mx-auto" />
                    <p className="text-xs font-space text-violet-300 leading-relaxed">
                      Reference image loaded.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload size={32} className="mx-auto text-violet-400 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-space tracking-widest text-white/70 uppercase">
                      DRAG & DROP REFERENCE PHOTO OR CLICK TO BROWSE
                    </p>
                    <p className="text-[10px] font-space text-white/40 uppercase">
                      SUPPORTS PNG, JPG, WEBP UP TO 25MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pose Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-space tracking-[0.2em] text-white/60 uppercase">
                SELECT CHARACTER POSE
              </label>
              <div className="option-cloud">
                {poses.map((pose) => (
                  <button
                    key={pose}
                    type="button"
                    onClick={() => setSelectedPose(pose)}
                    className={`option-chip py-3 px-4 text-xs font-space tracking-wider uppercase text-left transition-all ${
                      selectedPose === pose
                        ? 'border-violet-400 bg-violet-950/40 text-violet-200 font-bold'
                        : 'border-white/10 bg-[#0a0a0f] text-white/60 hover:text-white'
                    }`}
                  >
                    {pose}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-space tracking-[0.2em] text-white/60 uppercase">
                SELECT ARTISANAL FINISH
              </label>
              <div className="option-cloud">
                {finishes.map((finish) => (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setSelectedFinish(finish)}
                    className={`option-chip py-3 px-4 text-xs font-space tracking-wider uppercase text-left transition-all ${
                      selectedFinish === finish
                        ? 'border-violet-400 bg-violet-950/40 text-violet-100 font-bold'
                        : 'border-white/10 bg-[#0a0a0f] text-white/60 hover:text-white'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-space tracking-[0.2em] text-white/60 uppercase">
                SELECT SCULPTURE HEIGHT
              </label>
              <div className="option-cloud option-cloud--three">
                {scales.map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setSelectedScale(scale)}
                    className={`option-chip py-3 px-2 text-[11px] font-space tracking-wider uppercase text-center transition-all ${
                      selectedScale === scale
                        ? 'border-pink-400 bg-pink-950/40 text-pink-200 font-bold'
                        : 'border-white/10 bg-[#0a0a0f] text-white/60 hover:text-white'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Figure Interactive Live Summary & Transmission Form Right */}
          <div className="custom-console__blueprint space-y-6">
            <div className="blueprint-slab experience-panel p-8 space-y-6 shadow-[0_0_60px_rgba(127,0,255,0.15)]">
              <div>
                <span className="text-[10px] font-space tracking-[0.3em] text-violet-400 uppercase font-semibold">
                  ORION PROJECT / 00891
                </span>
                <h3 className="text-2xl font-syne font-bold text-white uppercase mt-1">
                  PROJECT DOSSIER
                </h3>
              </div>

              <div className="space-y-3 text-xs font-space tracking-wider border-y border-white/10 py-4">
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">CHARACTER POSE:</span>
                  <span className="text-amber-200 font-semibold">{selectedPose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">SURFACE FINISH:</span>
                  <span className="text-violet-200 font-semibold">{selectedFinish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">FIGURE HEIGHT:</span>
                  <span className="text-pink-300 font-semibold">{selectedScale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">REFERENCE ATTACHMENT:</span>
                  <span className="text-white/80">{uploadedFile ? 'ATTACHED' : 'PENDING'}</span>
                </div>
              </div>

              {/* Inquiry Form */}
              {isPrepared ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 size={40} className="mx-auto text-amber-300" />
                  <h4 className="text-xl font-syne font-bold text-white">REQUEST PREPARED</h4>
                  <p className="text-xs font-space text-white/60 leading-relaxed">
                    Your dossier is ready. Backend submission is not connected yet, so this screen prepares the collection inquiry for studio follow-up.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-space text-white/50 uppercase mb-1">
                      COLLECTOR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-space text-white/50 uppercase mb-1">
                      EMAIL FOR 3D PREVIEW PROOF
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      className="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <button
                    type="submit"
                    onMouseEnter={() => setCursor('SUBMIT', 'hover')}
                    onMouseLeave={resetCursor}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 text-white font-space text-xs tracking-[0.25em] font-semibold uppercase hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={16} />
                    <span>SEND TO ORION STUDIO</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
