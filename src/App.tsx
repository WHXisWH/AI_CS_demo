import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { BrainCircuit, Network, Cpu, ChevronDown, MapPin, Phone } from 'lucide-react';
import Honeycomb from './components/Honeycomb';

export default function App() {
  const [interactiveScene, setInteractiveScene] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncInteractiveScene = () => {
      setInteractiveScene(mediaQuery.matches);
    };

    syncInteractiveScene();
    mediaQuery.addEventListener('change', syncInteractiveScene);

    return () => {
      mediaQuery.removeEventListener('change', syncInteractiveScene);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] font-sans text-white">
      
      {/* 3D Background Layer - Fixed in background */}
      <div className={`fixed inset-0 z-0 ${interactiveScene ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden="true">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 12, 18]} fov={45} />
          <OrbitControls 
            enableRotate={interactiveScene}
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3} 
            maxPolarAngle={Math.PI / 2.2} 
            minPolarAngle={Math.PI / 4} 
          />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#FFD54F" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          <pointLight position={[0, 5, 0]} intensity={2} color="#FF8F00" distance={20} />
          <Environment preset="city" />
          <Honeycomb interactive={interactiveScene} />
          <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={50} blur={2} far={10} />
        </Canvas>
      </div>

      {/* UI Overlay Layer - Scrollable */}
      <div className="pointer-events-none relative z-10 w-full">
        
        {/* Top Navigation (Fixed) */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-auto fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-[#050505]/85 to-transparent px-5 py-5 backdrop-blur-sm md:p-8"
        >
          <div className="text-xl font-bold tracking-widest flex items-center gap-3">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <div className="absolute w-full h-full border-2 border-[#FFB300] rotate-45"></div>
              <div className="absolute w-3 h-3 bg-[#FFB300] rotate-45"></div>
            </div>
            <span className="drop-shadow-md">蜂序科技</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-widest text-white/80">
            <a href="#tech" className="hover:text-[#FFB300] transition-colors drop-shadow-sm">核心技术</a>
            <a href="#solutions" className="hover:text-[#FFB300] transition-colors drop-shadow-sm">服务内容</a>
            <a href="#about" className="hover:text-[#FFB300] transition-colors drop-shadow-sm">关于我们</a>
          </div>
        </motion.nav>

        {/* Hero Section (100vh) */}
        <section className={`${interactiveScene ? 'pointer-events-none' : 'pointer-events-auto touch-pan-y'} relative flex min-h-screen min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.6)_0%,transparent_60%)] px-5 pt-28 pb-20 sm:px-6 md:px-8`}>
          <div className="mt-6 flex max-w-6xl flex-col items-center text-center md:mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="mb-4 px-2 text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,179,0,0.3)] sm:text-5xl md:text-7xl">
                厦门蜂序科技有限公司
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 text-xs font-normal tracking-[0.18em] text-[#FFD54F] drop-shadow-md sm:text-sm sm:tracking-[0.24em] md:text-lg md:tracking-[0.3em]"
            >
              <span>严谨秩序</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>稳定架构</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>科技创新</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 max-w-2xl px-4 text-sm leading-relaxed tracking-wide text-white/80 drop-shadow-sm sm:mt-12 md:text-base"
            >
              以群体智能为基石，构建下一代分布式人工智能架构。
              我们致力于将自然界的完美秩序，转化为重塑行业的数字力量。
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.a 
            href="#tech"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="pointer-events-auto group absolute bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer md:bottom-12"
          >
            <span className="text-xs tracking-widest text-white/60 uppercase drop-shadow-sm group-hover:text-[#FFB300] transition-colors">探索蜂巢</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="text-[#FFB300] w-6 h-6 opacity-80" />
            </motion.div>
          </motion.a>
        </section>

        {/* Content Section 1: Core Technologies */}
        <section id="tech" className="pointer-events-auto relative flex min-h-screen min-h-[100svh] w-full scroll-mt-24 flex-col justify-center bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] px-5 py-24 sm:px-6 md:scroll-mt-28 md:px-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto w-full"
          >
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">核心技术 <span className="text-[#FFB300]">.</span></h2>
              <p className="text-white/50 tracking-widest text-sm uppercase">Core Technologies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tech Card 1 */}
              <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.05] hover:border-[#FFB300]/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-transparent flex items-center justify-center mb-6 border border-[#FFB300]/20 group-hover:scale-110 transition-transform duration-500">
                  <BrainCircuit className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">大模型深度集成</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  整合国内外主流大语言模型能力，根据业务场景灵活调用。让企业以最低成本获得最前沿的AI技术支持。
                </p>
              </div>

              {/* Tech Card 2 */}
              <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.05] hover:border-[#FFB300]/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-transparent flex items-center justify-center mb-6 border border-[#FFB300]/20 group-hover:scale-110 transition-transform duration-500">
                  <Network className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">智能工作流引擎</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  自主研发的流程编排引擎，支持复杂业务逻辑的可视化配置。无缝对接企业现有系统，实现端到端的智能自动化。
                </p>
              </div>

              {/* Tech Card 3 */}
              <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.05] hover:border-[#FFB300]/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-transparent flex items-center justify-center mb-6 border border-[#FFB300]/20 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">敏捷产品交付</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  采用模块化开发架构，快速响应客户需求变化。从原型到上线全程高效协作，确保AI产品按时高质量交付。
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section 2: Solutions */}
        <section id="solutions" className="pointer-events-auto relative w-full scroll-mt-24 bg-[#050505] px-5 py-24 sm:px-6 md:scroll-mt-28 md:px-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto w-full"
          >
            <div className="mb-16 md:text-right">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">我们的服务 <span className="text-[#FFB300]">.</span></h2>
              <p className="text-white/50 tracking-widest text-sm uppercase">Our Services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex flex-col justify-between min-h-[300px] hover:border-[#FFB300]/20 transition-colors">
                <Cpu className="text-white/30 w-10 h-10 mb-8" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">定制化AI工具与平台</h3>
                  <p className="text-white/50">根据企业独特需求，量身打造专属AI工具与智能平台。从需求分析到落地部署，全流程深度定制，让AI真正为您所用。</p>
                </div>
              </div>
              <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex flex-col justify-between min-h-[300px] hover:border-[#FFB300]/20 transition-colors">
                <Network className="text-white/30 w-10 h-10 mb-8" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">智能自动化流程设计</h3>
                  <p className="text-white/50">深入分析业务场景，设计并实施智能自动化解决方案。将重复繁琐的工作交给AI，释放团队创造力，提升整体运营效率。</p>
                </div>
              </div>
              <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] flex flex-col justify-between min-h-[300px] hover:border-[#FFB300]/20 transition-colors">
                <BrainCircuit className="text-white/30 w-10 h-10 mb-8" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">AI科技产品服务</h3>
                  <p className="text-white/50">提供多元化的AI科技产品与技术支持，涵盖智能客服、内容生成、数据分析等领域，助力企业快速拥抱AI时代。</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section 3: About Us */}
        <section id="about" className="pointer-events-auto relative w-full scroll-mt-24 bg-[#050505] px-5 py-24 sm:px-6 md:scroll-mt-28 md:px-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto w-full"
          >
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">关于我们 <span className="text-[#FFB300]">.</span></h2>
              <p className="text-white/50 tracking-widest text-sm uppercase">About Us</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-white/70 leading-relaxed mb-8">
                  厦门蜂序科技有限公司专注于AI技术的商业化落地，致力于为企业提供定制化的人工智能解决方案。我们相信，AI不应只是概念，而应成为推动业务增长的实际生产力。
                </p>
                <p className="text-white/70 leading-relaxed">
                  凭借对前沿技术的深刻理解和丰富的行业实践经验，我们帮助客户将AI融入日常运营，实现降本增效、创新升级。
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex flex-col justify-center">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="text-[#FFB300] w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">公司地址</h4>
                    <p className="text-white/60">厦门市湖里区东黄路215号</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#FFB300] w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">联系方式</h4>
                    <p className="text-white/60">15504452350（常经理）</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pointer-events-auto w-full border-t border-white/10 bg-[#050505] px-5 py-12 text-center sm:px-6">
          <div className="w-8 h-8 relative mx-auto mb-6 opacity-50">
            <div className="absolute w-full h-full border border-[#FFB300] rotate-45"></div>
            <div className="absolute w-3 h-3 bg-[#FFB300] rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-white/30 text-sm tracking-widest">© 2026 厦门蜂序科技有限公司. All Rights Reserved.</p>
        </footer>

      </div>
    </div>
  );
}
