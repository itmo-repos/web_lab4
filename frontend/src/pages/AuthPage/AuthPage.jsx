import React, { useRef, useEffect } from 'react';
import './AuthPage.css';

import Particles from '../../components/Particles/Particles';
import { AuthCard } from '../../components/AuthCard/AuthCard';

export function AuthPage() {


  return (
    <div className="auth-page">
        <Particles
          particleColors={['#000000']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={300}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        <header className="auth-header">
          <span className="logo">Тарасов Савелий Дмитриевич, P3206, Вариант 4245</span>
        </header>

        <AuthCard />
    </div>
  );
}
