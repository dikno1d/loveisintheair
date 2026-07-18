'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  blooming: boolean;
  onBloomComplete: () => void;
  bloomed?: boolean;
}

export default function BloomingRoseSVG({ blooming, onBloomComplete, bloomed }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animated = useRef(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!blooming || animated.current || !svgRef.current) return;
    animated.current = true;
    const svg = svgRef.current;
    for (let i = 0; i < 15; i++) {
      const el = svg.getElementById(`a${i}`);
      if (el) (el as SVGAnimationElement).beginElement();
    }
    setTimeout(() => setInit(true), 500);
    const t = setTimeout(onBloomComplete, 8000);
    return () => clearTimeout(t);
  }, [blooming, onBloomComplete]);

  return (
    <motion.div
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      animate={bloomed || init ? {
        filter: [
          'drop-shadow(0 0 30px rgba(232,160,191,0.3))',
          'drop-shadow(0 0 50px rgba(232,160,191,0.5))',
          'drop-shadow(0 0 30px rgba(232,160,191,0.3))',
        ],
      } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 188 264"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 'min(78vw, 420px)',
          maxHeight: '85vh',
          height: 'auto',
          filter: 'drop-shadow(0 0 40px rgba(232,80,120,0.25))',
          marginTop: bloomed ? '5vh' : 0,
        }}
      >
        <defs>
          <radialGradient id="g0" gradientUnits="userSpaceOnUse" cx="-107.308" cy="104.329" r="59.181" gradientTransform="matrix(0.261752,0.411262,-0.686293,0.596934,160.095,49.39)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g1" gradientUnits="userSpaceOnUse" cx="113.342" cy="62.644" r="53.882" gradientTransform="matrix(-0.169507,1.182475,-0.714039,-0.308382,160.212,-46.523)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g2" gradientUnits="userSpaceOnUse" cx="33.089" cy="83.922" r="27.475" gradientTransform="matrix(0.758528,1.916342,-0.693287,0.585241,83.304,-39.361)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g3" gradientUnits="userSpaceOnUse" cx="127.727" cy="116.674" r="45.581" gradientTransform="matrix(-0.468422,-1.651974,0.962071,-0.272798,74.447,391.899)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g4" gradientUnits="userSpaceOnUse" cx="43.926" cy="85.895" r="44.319" gradientTransform="matrix(1.145876,-0.154456,0.133585,0.991037,18.522,10.449)">
            <stop offset="0" stopColor="rgb(56,16,20)"/>
            <stop offset="1" stopColor="rgb(232,80,120)"/>
          </radialGradient>
          <radialGradient id="g5" gradientUnits="userSpaceOnUse" cx="70.257" cy="63.907" r="38.537" gradientTransform="matrix(-0.480251,0.463812,-0.694689,-0.719311,216.251,74.926)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g6" gradientUnits="userSpaceOnUse" cx="99.231" cy="116.778" r="19.209" gradientTransform="matrix(0.18829,-1.009689,0.983052,0.183324,-48.105,172.536)">
            <stop offset="0" stopColor="rgb(51,13,16)"/>
            <stop offset="1" stopColor="rgb(232,80,120)"/>
          </radialGradient>
          <radialGradient id="g7" gradientUnits="userSpaceOnUse" cx="77.314" cy="119.309" r="20.726" gradientTransform="matrix(-1.623871,-1.229366,0.603596,-0.79729,122.245,298.564)">
            <stop offset="0" stopColor="rgb(115,42,45)"/>
            <stop offset="1" stopColor="rgb(232,80,120)"/>
          </radialGradient>
          <radialGradient id="g8" gradientUnits="userSpaceOnUse" cx="91.275" cy="115.836" r="34.163">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g9" gradientUnits="userSpaceOnUse" cx="87.793" cy="121.847" r="7.864" gradientTransform="matrix(-0.305698,-2.998266,0.994843,-0.101432,-6.587,397.433)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(95,30,32)"/>
          </radialGradient>
          <radialGradient id="g10" gradientUnits="userSpaceOnUse" cx="77.806" cy="136.077" r="46.618" gradientTransform="matrix(1.007103,0,0,1.028773,3.51,-3.184)">
            <stop offset="0" stopColor="rgb(232,80,120)"/>
            <stop offset="1" stopColor="rgb(141,41,60)"/>
          </radialGradient>
          <radialGradient id="g11" gradientUnits="userSpaceOnUse" cx="34.864" cy="119.976" r="36.699" gradientTransform="matrix(-0.483999,-0.503131,0.29077,-1.102951,30.969,262.661)">
            <stop offset="0" stopColor="rgb(67,100,40)"/>
            <stop offset="1" stopColor="rgb(120,160,80)"/>
          </radialGradient>
          <radialGradient id="g12" gradientUnits="userSpaceOnUse" cx="41.572" cy="155.958" r="37.322" gradientTransform="matrix(0.598359,0,-0.729427,1.012048,147.786,-2.069)">
            <stop offset="0" stopColor="rgb(60,90,35)"/>
            <stop offset="1" stopColor="rgb(100,140,60)"/>
          </radialGradient>
          <radialGradient id="g13" gradientUnits="userSpaceOnUse" cx="107.613" cy="177.189" r="41.15" gradientTransform="matrix(0.722745,0,0,0.553521,18.427,66.942)">
            <stop offset="0" stopColor="rgb(80,120,50)"/>
            <stop offset="1" stopColor="rgb(55,75,30)"/>
          </radialGradient>
          <linearGradient id="g14" gradientUnits="userSpaceOnUse" x1="79.232" y1="148.661" x2="79.232" y2="267.785" gradientTransform="matrix(0.025831,-0.999666,0.153237,0.00396,43.954,274.435)">
            <stop offset="0" stopColor="#90b050"/>
            <stop offset="1" stopColor="rgb(50,65,20)"/>
          </linearGradient>
        </defs>

        {/* stem */}
        <path d="M73.281 159.571 C72.647 190.375 75.055 224.982 80.506 263.392 C81.129 267.785 93.817 263.392 93.817 263.392 C92.284 264.35 81.135 187.678 88.112 161.093 C90.388 152.419 77.266 148.661 73.281 159.571Z" fill="url(#g14)">
          <animate id="a0" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M69.281 159.571 C68.647 190.375 71.055 224.982 76.506 263.392 C77.129 267.785 89.817 263.392 89.817 263.392 C88.284 264.35 77.135 187.678 84.112 161.093 C86.388 152.419 73.266 148.661 69.281 159.571Z"/>
        </path>

        {/* left leaf */}
        <path d="M46.953 119.95 C45.235 117.533 42.584 112.794 41.114 110.103 C40.46 108.906 40.478 108.549 40.039 108.114 C35.996 104.1 26.687 103.38 26.687 103.38 C26.687 103.38 34.854 97.115 39.086 97.698 C44.858 98.492 50.547 103.452 55.298 110.008 C62.512 119.962 72.703 149.303 72.703 149.303 C72.703 149.303 55.029 131.31 46.953 119.95Z" fill="url(#g11)">
          <animate id="a1" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M31.631 125.725 C28.891 123.784 24.662 119.977 22.317 117.816 C21.274 116.854 21.302 116.567 20.603 116.218 C14.153 112.994 -0.694 112.415 -0.694 112.415 C-0.694 112.415 12.333 107.383 19.082 107.851 C28.289 108.489 37.364 112.473 44.942 117.739 C56.448 125.735 72.703 149.303 72.703 149.303 C72.703 149.303 44.513 134.85 31.631 125.725Z"/>
        </path>

        {/* right leaf */}
        <path d="M125.945 180.107 L109.454 169.372 C106.365 165.002 109.271 159.533 100.933 155.899 C94.395 153.05 66.464 149.933 78.394 155.058 C93.119 161.382 82.057 170.1 125.945 180.107Z" fill="url(#g13)">
          <animate id="a2" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M148.763 204.446 L125.945 185.051 C121.672 177.156 125.693 167.276 114.156 160.712 C105.11 155.565 66.464 149.933 82.971 159.191 C103.344 170.617 88.039 186.367 148.763 204.446Z"/>
        </path>

        {/* outer petal right */}
        <path d="M90.099 156.29 C88.891 153.292 90.921 155.595 93.141 153.247 C98.208 147.888 95.989 137.519 101.888 133.092 C108.341 128.25 113.536 123.721 107.972 117.88 C97.368 106.747 107.951 83.841 112.536 84.414 C112.536 84.414 113.025 78.245 118.24 79.85 C123.087 81.341 135.801 78.415 137.255 83.273 C138.221 86.5 136.354 90.548 133.832 92.78 C131.69 94.675 127.25 92.447 125.466 94.682 C124.517 95.871 123.465 94.713 122.424 95.822 C121.033 97.303 119.381 99.626 119.381 99.626 C119.381 99.626 121.654 92.196 120.141 104.95 C119.318 111.882 120.656 105.712 117.48 117.879 C115.795 124.332 120.84 127.039 111.015 143.74 C108.626 147.8 106.597 153.874 101.888 154.008 C98.64 154.1 91.313 159.304 90.099 156.29Z" fill="url(#g3)">
          <animate id="a3" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M88.958 161.994 C87.75 158.996 90.921 155.595 93.141 153.247 C98.208 147.888 106.637 147.026 112.536 142.599 C118.989 137.757 124.478 131.678 129.649 125.486 C137.065 116.606 149.425 96.964 149.425 96.964 C149.425 96.964 160.562 94.598 165.777 96.203 C170.624 97.694 176.493 100.472 177.947 105.33 C178.913 108.557 177.046 112.605 174.524 114.837 C172.382 116.732 167.942 114.504 166.158 116.739 C165.209 117.928 167.199 120.193 166.158 121.302 C164.767 122.783 160.073 121.683 160.073 121.683 C160.073 121.683 155.121 139.733 149.044 146.402 C144.342 151.562 137.389 154.391 130.79 156.67 C124.486 158.847 117.417 157.843 111.015 159.712 C106.493 161.032 102.794 165.283 98.085 165.417 C94.837 165.509 90.172 165.008 88.958 161.994Z"/>
        </path>

        {/* big petal left */}
        <path d="M62.176 137.894 C59.831 133.766 59.753 126.528 57.254 118.879 C55.976 114.967 56.069 106.679 54.167 102.907 C52.326 99.257 52.23 94.76 50.378 91.118 C47.918 86.281 50.766 86.433 41.044 80.85 C36.499 78.24 31.211 82.949 33.109 78.188 C36.417 69.886 50.787 73.079 57.47 68.3 C60.05 66.455 63.869 64.244 67.014 63.357 C68.178 63.028 70.383 64.878 70.383 64.878 C70.383 64.878 71.908 61.837 75.047 62.975 C75.047 62.975 76.907 66.637 80.141 64.117 C83.6 61.423 82.944 65.721 86.799 67.54 C94.384 71.119 94.482 74.765 94.482 74.765 C128.904 119.447 94.989 195.653 62.176 137.894Z" fill="url(#g0)">
          <animate id="a4" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M44.942 120.781 C41.293 117.204 34.996 117.021 31.631 113.175 C28.748 109.88 28.911 104.778 26.688 101.006 C24.536 97.356 20.866 94.76 18.701 91.118 C15.826 86.281 12.931 81.109 12.236 75.526 C11.587 70.314 12.3 64.695 14.518 59.934 C18.386 51.632 24.959 44.177 32.772 39.398 C35.788 37.553 39.364 37.623 43.04 36.736 C44.401 36.407 43.421 32.553 43.421 32.553 C43.421 32.553 44.315 31.034 47.984 32.172 C47.984 32.172 51.048 22.903 54.829 20.383 C58.872 17.689 64.775 16.663 69.281 18.482 C78.148 22.061 87.155 40.919 87.155 40.919 C129.95 85.497 103.042 177.736 44.942 120.781Z"/>
        </path>

        {/* petal inner right */}
        <path d="M70.914 71.237 L76.638 69.198 C77.362 66.255 89.209 45.785 90.524 68.715 C90.661 71.103 93.14 66.504 93.14 66.504 C93.14 66.504 98.766 61.707 101.007 62.911 C106.081 65.636 109.6 59.835 112.863 65.977 C118.208 76.036 108.947 85.333 108.52 96.88 C108.213 105.193 114.806 116.288 111.821 123.103 C109.37 128.702 107.584 146.029 107.584 146.029 C80.053 193.792 53.77 100.982 70.914 71.237Z" fill="url(#g1)" transform="matrix(0.99135,0.131244,-0.131244,0.99135,15.956,-10.615)">
          <animate id="a5" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M73.464 53.849 L87.535 41.68 C87.535 41.68 105.977 36.949 113.775 40.919 C116.376 42.243 118.719 48.145 118.719 48.145 C118.719 48.145 125.275 48.072 128.227 49.286 C134.91 52.035 141.618 56.401 145.34 62.596 C151.436 72.743 153.533 85.935 151.425 97.583 C149.908 105.969 143.531 112.765 138.495 119.64 C134.358 125.288 124.424 135.233 124.424 135.233 C79.951 183.412 45.768 83.853 73.464 53.849Z"/>
        </path>

        {/* calyx right */}
        <path d="M79.028 139.796 C79.028 139.796 70.453 142.266 65.687 144.415 C61.432 146.333 57 148.408 52.224 151.728 C47.552 154.975 42.312 161.308 37.936 163.659 C34.523 165.493 30.327 164.428 30.327 164.428 C40.91 171.741 56.429 169.047 76.884 156.346 C84.002 151.926 84.717 146.409 79.028 139.796Z" fill="url(#g12)">
          <animate id="a6" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M55.97 140.176 C55.97 140.176 44.615 142.617 39.237 144.74 C34.437 146.635 29.53 148.686 25.547 151.966 C21.65 155.175 20.521 161.432 16.039 163.755 C12.543 165.567 4.25 164.515 4.25 164.515 C30.744 171.741 53.435 169.079 72.323 156.529 C78.894 152.162 73.443 146.711 55.97 140.176Z"/>
        </path>

        {/* petal mid-left */}
        <path d="M105.028 130.668 C98.146 97.987 126.006 49.499 85.253 68.681 C54.631 83.094 48.236 181.015 105.028 130.668Z" fill="url(#g5)">
          <animate id="a7" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M112.254 128.767 C132.537 99.358 127.585 45.893 100.845 62.596 C72.14 80.525 55.462 179.114 112.254 128.767Z"/>
        </path>

        {/* petal mid-right */}
        <path d="M67.428 133.685 L66.92 115.513 C58.539 81.763 60.825 70.019 73.777 80.279 C88.292 91.779 95.234 113.66 94.601 145.924 C94.329 159.843 85.271 155.764 67.428 133.685Z" fill="url(#g2)">
          <animate id="a8" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M47.239 119.453 L46.478 100.819 C33.928 66.212 37.351 54.17 56.746 64.691 C78.482 76.482 88.877 98.92 87.93 132.003 C87.522 146.276 73.958 142.092 47.239 119.453Z"/>
        </path>

        {/* inner petal left */}
        <path d="M100.085 83.132 C88.793 39.094 59.208 77.578 68.14 112.415 C81.999 195.394 111.856 135.608 100.085 83.132Z" fill="url(#g4)">
          <animate id="a9" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M108.832 77.808 C97.54 33.77 37.151 58.943 46.083 93.78 C73.235 179.557 125.789 131.376 108.832 77.808Z"/>
        </path>

        {/* inner petal 1 */}
        <path d="M72.703 94.161 C82.337 75.526 90.45 75.906 97.042 95.301 C102.305 110.787 96.981 126.253 81.07 141.698 Q63.887 158.377 72.703 94.161Z" fill="url(#g6)">
          <animate id="a10" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M72.703 94.161 C82.337 75.526 90.45 75.906 97.042 95.301 C102.305 110.787 96.981 126.253 81.07 141.698 Q63.887 158.377 72.703 94.161Z"/>
        </path>

        {/* inner petal 2 */}
        <path d="M79.929 94.921 C79.929 110.386 82.718 124.838 88.296 138.275 C94.391 152.956 95.658 137.111 92.099 90.738 C92.233 91.34 89.707 99.625 79.929 94.921Z" fill="url(#g9)">
          <animate id="a11" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M79.929 94.921 C79.929 110.386 82.718 124.838 88.296 138.275 C94.391 152.956 95.658 137.111 92.099 90.738 C92.233 91.34 89.707 99.625 79.929 94.921Z"/>
        </path>

        {/* inner petal 3 */}
        <path d="M73.464 85.414 C69.982 90.035 68.588 93.977 70.421 104.429 C72.308 115.19 88.12 121.815 82.971 132.951 C77.322 145.168 90.148 136.061 94 103.288 C92.924 104.58 91.84 102.508 73.464 85.414Z" fill="url(#g7)">
          <animate id="a12" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M60.914 84.273 C54.322 88.203 52.547 95.936 55.59 107.471 C58.634 119.012 64.719 129.28 73.844 138.275 C83.429 147.724 90.148 136.061 94 103.288 C92.924 104.58 79.29 101.367 60.914 84.273Z"/>
        </path>

        {/* inner petal 4 */}
        <path d="M68.14 97.964 C70.663 106.543 101.871 103.202 99.324 94.541 C100.286 103.186 107.338 120.762 86.013 126.486 C69.818 130.833 68.761 122.681 68.14 97.964Z" fill="url(#g8)">
          <animate id="a13" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M55.21 105.95 C57.733 114.529 114.801 99.399 112.254 90.738 C123.536 115.964 118.212 136.627 97.042 142.078 C80.803 146.259 65.338 131.428 55.21 105.95Z"/>
        </path>

        {/* center petal */}
        <path d="M65.621 71.386 C73.187 66.787 74.757 123.742 73.282 132.028 C73.282 132.028 73.916 123.242 72.899 120.682 C65.839 102.914 78.876 22.508 100.091 72.56 C102.929 79.255 98.089 86.6 106.603 88.21 C109.251 88.711 110.816 108.552 110.816 108.552 C110.816 108.552 109.611 116.801 111.581 117.942 C112.973 118.748 110.433 126.551 110.433 126.551 C110.433 126.551 111.19 129.51 109.283 131.244 C103.986 136.064 105.8 144.744 99.709 148.46 C97.396 149.87 101.41 154.006 98.943 155.111 C95.538 156.636 91.926 157.948 88.219 158.24 C85.14 158.483 81.973 158.015 79.027 157.067 C74.07 155.474 73.98 150.948 70.219 147.286 C67.857 144.986 67.952 132.013 65.622 129.679 C63.214 127.267 64.91 123.17 64.091 112.466 C63.678 107.072 64.091 91.729 64.091 91.729 C64.091 91.729 59.049 86.584 59.877 79.211 C60.224 76.12 63.005 72.977 65.621 71.386Z" fill="url(#g10)">
          <animate id="a14" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0 .06 0 .97" keyTimes="0;1" attributeName="d" dur="12000ms"
            to="M39.237 122.683 C46.749 118.213 62.759 115.009 61.295 123.063 C61.295 123.063 66.241 120.779 68.9 120.401 C73.55 119.739 78.314 120.546 82.971 121.162 C91.45 122.284 99.617 125.191 108.071 126.486 C110.714 126.891 116.057 127.246 116.057 127.246 C116.057 127.246 120.185 127.658 122.142 128.767 C123.524 129.55 124.424 132.951 124.424 132.951 C124.424 132.951 121.753 137.349 119.86 139.035 C114.6 143.72 107.654 146.072 101.606 149.684 C99.31 151.055 97.21 152.793 94.761 153.867 C91.38 155.35 87.793 156.625 84.112 156.909 C81.055 157.145 77.91 156.69 74.985 155.769 C70.063 154.22 65.03 152.103 61.295 148.543 C58.95 146.308 58.664 142.444 56.351 140.176 C53.96 137.831 50.7 136.511 47.604 135.233 C42.743 133.227 32.392 131.049 32.392 131.049 C32.392 131.049 31.189 128.709 31.631 127.627 C32.774 124.828 36.639 124.229 39.237 122.683Z"/>
        </path>
      </svg>
    </motion.div>
  );
}
