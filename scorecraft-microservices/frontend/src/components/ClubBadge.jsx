import React, { useState } from 'react';

// Intelligent matching of Peruvian clubs by name or short code
function getOfficialBadge(name = '', shortName = '') {
  const n = (name || '').toLowerCase();
  const c = (shortName || '').toUpperCase();

  if (n.includes('cristal') || c === 'CRI' || c === 'SPO' || c === 'SC') {
    return '/teams/cristal.svg';
  }
  if (n.includes('alianza') || c === 'ALI') {
    return '/teams/alianza.svg';
  }
  if (n.includes('universitario') || n.includes('deportes') || c === 'UNI') {
    return '/teams/universitario.svg';
  }
  if (n.includes('melgar') || c === 'MEL' || c === 'FBC') {
    return '/teams/melgar.svg';
  }
  if (n.includes('cienciano') || c === 'CIE') {
    return '/teams/cienciano.svg';
  }
  if (n.includes('cusco') || c === 'CUS') {
    return '/teams/cusco.svg';
  }
  return null;
}

// Fallback styling if local file is missing
const PRESET_CRESTS = {
  ALI: { bg: '#002B7F', border: '#FFFFFF', text: '#FFFFFF', stripes: true },
  UNI: { bg: '#FFF8E7', border: '#8B1C28', text: '#8B1C28', letter: 'U' },
  CRI: { bg: '#00A3E0', border: '#FFFFFF', text: '#FFFFFF', letter: 'SC' },
  SPO: { bg: '#00A3E0', border: '#FFFFFF', text: '#FFFFFF', letter: 'SC' },
  MEL: { bg: '#E30613', border: '#111827', text: '#FFFFFF', halves: '#111827', letter: 'MEL' },
  FBC: { bg: '#E30613', border: '#111827', text: '#FFFFFF', halves: '#111827', letter: 'MEL' },
  CIE: { bg: '#C8102E', border: '#FFFFFF', text: '#FFFFFF', letter: 'C' },
  CUS: { bg: '#18181B', border: '#D4AF37', text: '#D4AF37', letter: 'CFC' },
};

export default function ClubBadge({
  name = '',
  shortName = '',
  logoUrl = '',
  primaryColor = '#3B82F6',
  size = 'md',
  className = '',
}) {
  const [imgError, setImgError] = useState(false);

  // Normalize code
  const code = (shortName || (name ? name.substring(0, 3) : 'FC')).toUpperCase();

  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-16 h-16 text-base',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const officialBadge = getOfficialBadge(name, shortName);

  // Resolve best image URL:
  // If URL is from Wikimedia (blocked on localhost) or empty, or matches known official clubs, use local SVG
  let targetSrc = logoUrl;
  if (!targetSrc || targetSrc.includes('wikimedia.org') || targetSrc.includes('upload.wikimedia')) {
    if (officialBadge) {
      targetSrc = officialBadge;
    }
  } else if (officialBadge && !targetSrc.startsWith('/teams/') && !targetSrc.startsWith('data:')) {
    // Prefer the high-res local official vector logo over outdated/broken external links
    targetSrc = officialBadge;
  }

  // Render image
  if (targetSrc && !imgError) {
    return (
      <div
        className={`${currentSize} rounded-xl bg-slate-900/60 border border-white/10 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden transition-transform group-hover:scale-105 ${className}`}
        title={name}
      >
        <img
          src={targetSrc}
          alt={name || code}
          referrerPolicy="no-referrer"
          onError={() => {
            if (officialBadge && targetSrc !== officialBadge) {
              setImgError(false);
              // Switch to local official SVG
              targetSrc = officialBadge;
            } else {
              setImgError(true);
            }
          }}
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback Crest
  const preset = PRESET_CRESTS[code] || PRESET_CRESTS[code.substring(0, 3)];
  const bgColor = preset?.bg || primaryColor || '#1E293B';
  const textColor = preset?.text || '#FFFFFF';
  const borderColor = preset?.border || 'rgba(255,255,255,0.2)';

  return (
    <div
      className={`${currentSize} rounded-xl shrink-0 flex items-center justify-center font-black tracking-wider shadow-md overflow-hidden relative border transition-transform ${className}`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
      }}
      title={name}
    >
      {preset?.stripes && (
        <div className="absolute inset-0 flex opacity-25 pointer-events-none">
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-transparent"></div>
          <div className="w-1/3 h-full bg-white"></div>
        </div>
      )}
      {preset?.halves && (
        <div
          className="absolute inset-0 w-1/2 h-full opacity-40 pointer-events-none"
          style={{ backgroundColor: preset.halves }}
        />
      )}

      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      <span className="relative z-10 font-mono font-extrabold select-none drop-shadow">
        {preset?.letter || code.substring(0, 3)}
      </span>
    </div>
  );
}
