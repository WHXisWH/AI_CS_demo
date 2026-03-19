import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './features/dashboard';
import { Conversations } from './features/conversations';
import { AIAssistant } from './features/ai-assistant';
import { Analytics } from './features/analytics';
import { FlowDesigner } from './features/flow-designer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/flow-designer" element={<FlowDesigner />} />
        {/* Placeholder routes */}
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/help" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
