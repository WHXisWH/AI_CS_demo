import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { BrainCircuit, Network, Cpu, ChevronDown } from 'lucide-react';
import Honeycomb from './components/Honeycomb';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-y-auto overflow-x-hidden font-sans text-white scroll-smooth">
      
      {/* 3D Background Layer - Fixed in background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 12, 18]} fov={45} />
          <OrbitControls 
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
          <Honeycomb />
          <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={50} blur={2} far={10} />
        </Canvas>
      </div>

      {/* UI Overlay Layer - Scrollable */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* Top Navigation (Fixed) */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center pointer-events-auto z-50 bg-gradient-to-b from-[#050505]/80 to-transparent backdrop-blur-sm"
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
            <a href="#solutions" className="hover:text-[#FFB300] transition-colors drop-shadow-sm">解决方案</a>
            <a href="#about" className="hover:text-[#FFB300] transition-colors drop-shadow-sm">关于我们</a>
          </div>
        </motion.nav>

        {/* Hero Section (100vh) */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.6)_0%,transparent_60%)]">
          <div className="text-center flex flex-col items-center mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_20px_rgba(255,179,0,0.3)] pointer-events-auto">
                厦门蜂序科技有限公司
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-4 text-sm md:text-lg tracking-[0.3em] text-[#FFD54F] font-normal drop-shadow-md"
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
              className="mt-12 max-w-xl text-white/80 text-sm md:text-base leading-relaxed tracking-wide drop-shadow-sm px-4"
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
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group"
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
        <section id="tech" className="relative w-full min-h-screen py-32 px-6 md:px-20 flex flex-col justify-center pointer-events-auto bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]">
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
                  <Network className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">群体智能算法</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  模拟生物集群行为，实现去中心化的自适应寻优。在复杂多变的环境中，赋予系统自我组织与协同进化的能力。
                </p>
              </div>

              {/* Tech Card 2 */}
              <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.05] hover:border-[#FFB300]/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-transparent flex items-center justify-center mb-6 border border-[#FFB300]/20 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">分布式算力网络</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  打破单点瓶颈，动态调度边缘与云端算力。构建高可用、高并发的计算矩阵，为海量数据处理提供澎湃动力。
                </p>
              </div>

              {/* Tech Card 3 */}
              <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.05] hover:border-[#FFB300]/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-transparent flex items-center justify-center mb-6 border border-[#FFB300]/20 group-hover:scale-110 transition-transform duration-500">
                  <BrainCircuit className="text-[#FFB300] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">多模态大模型</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  深度融合视觉、语言与时序数据。打造具备深度理解与推理能力的垂直领域 AI，提供全维度的智能决策支持。
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section 2: Solutions */}
        <section id="solutions" className="relative w-full py-32 px-6 md:px-20 bg-[#050505] pointer-events-auto">
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

        {/* Footer */}
        <footer className="w-full py-12 border-t border-white/10 bg-[#050505] pointer-events-auto text-center">
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
