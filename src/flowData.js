import {MarkerType} from 'reactflow';
import workflowsData from './workflows.json';
const markerEnd={type: MarkerType.ArrowClosed,width: 20,height: 20,color: '#764abc',}

export const successfulDeliveryPosition=[{ "x": 50, "y": 0 },{ "x": 50, "y": 100 },{ "x": 50, "y": 200 },{ "x": 50, "y": 300 }];

export const successfulDeliveryEdges=[{ id: '1-2', source: '1', target: '2',type:'smoothstep',markerEnd},
{ id: '2-3', source: '2', target: '3',type:'smoothstep',markerEnd},
{ id: '3-4', source: '3', target: '4',type:'straight',markerEnd}];

export const returnWorkflowEdges = [{ id: '1-2', source: '1', target: '2',type:'smoothstep',markerEnd},
{ id: '2-3', source: '2', target: '3',type:'smoothstep',markerEnd},
{ id: '3-5', source: '3', target: '5',type:'straight',markerEnd},
{ id: '5-6', source: '5', target: '6',type:'straight',markerEnd}];

export const returnWorkflowNodes = workflowsData.orderReturn.map(({ id, event, position, type }) => {
    return {
      id: id.toString(),
      data: { label: event },
      position: position,
      type: type || '',
      
    };
  });
export const cancellationWorkflowEdges = [{ id: '1-2', source: '1', target: '2',type:'smoothstep',markerEnd},{ id: '2-3', source: '2', target: '3',type:'smoothstep',markerEnd},{ id: '3-4', source: '4', target: '3',type:'',label:'Cancel' },{ id: '2-4', source: '2', target: '4',type:'',label:'Cancel'}];


export const cancellationWorkflowNodes = workflowsData.orderCancellation.map(({ id, event, position, type }) => {
    return {
      id: id.toString(),
      data: { label: event },
      position: position,
      type: type || '',
      
    };
  });
