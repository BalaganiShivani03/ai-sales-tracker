import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DealCard from './DealCard';

const PipelineColumn = ({ title, deals, columnId }) => (
  <div className="pipeline-column">
    <h3>{title}</h3>
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {deals.map((deal, index) => (
            <DealCard key={deal._id} deal={deal} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default PipelineColumn;

