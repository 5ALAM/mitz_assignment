import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Container, Typography } from '@mui/material';
import './App.css';
import workflowsData from './workflows.json';
import 'reactflow/dist/style.css';
import Flow from './flow';
import { cancellationWorkflowEdges, cancellationWorkflowNodes, returnWorkflowEdges, returnWorkflowNodes, successfulDeliveryEdges, successfulDeliveryPosition } from './flowData';

const WorkflowComponent = ({workflowData, workflow, children }) => {

    const combinedData = workflow === 'successfulDelivery' ? workflowData : workflowsData[workflow];

    if (!combinedData) {
        return <div>Error: Workflow "{workflow}" not found.</div>;
    }

    return (
        <Container className="workflow-container">
            <Typography variant="h4" gutterBottom>
            {workflow.charAt(0).toUpperCase() + workflow.slice(1)} Workflow
            </Typography>
            <Stepper alternativeLabel>
                {combinedData.map(step => (
                    <Step key={step.id}>
                        <StepLabel>{step.event}</StepLabel>
                    </Step>
                ))}
               
                
            </Stepper>
            {children}
        </Container>
    );
};

const App = () => {

    const [workflowData, setWorkflowData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await fetch('https://d2b83f18-f85b-41e1-95fd-a175ef150e62.mock.pstmn.io/delivered');
                    if (!response.ok) {
                        throw new Error('Failed to fetch workflow data');
                    }
                    const data = await response.json();
                    const mergedData = data.map((item, index) => ({
                        id: item.id.toString(),
                        data: {label: item.event},
                        event: item.event,
                        position: successfulDeliveryPosition[index],
                        type: index === 0 ? 'input' : index === data.length-1 ? 'output' : ''
                    }));
                    setWorkflowData(mergedData);
                
            } catch (error) {
                console.error('Error fetching workflow data:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div>
        <WorkflowComponent workflow="successfulDelivery" workflowData={workflowData}><Flow edges={successfulDeliveryEdges} nodes={workflowData}/></WorkflowComponent>
        <WorkflowComponent workflow="orderCancellation" workflowData={workflowData}><Flow edges={cancellationWorkflowEdges} nodes={cancellationWorkflowNodes}/></WorkflowComponent>
        <WorkflowComponent workflow="orderReturn"  workflowData={workflowData}><Flow edges={returnWorkflowEdges} nodes={returnWorkflowNodes}/></WorkflowComponent> 
    </div>
    )
}

export default App;
