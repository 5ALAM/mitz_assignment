import ReactFlow, { Controls, Background} from 'reactflow';
import 'reactflow/dist/style.css';

function Flow({edges, nodes}) {
  return (
    <div style={{ height: '400px',width:"100%" }}>
      <ReactFlow nodes={nodes} edges={edges}  panOnScroll
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
