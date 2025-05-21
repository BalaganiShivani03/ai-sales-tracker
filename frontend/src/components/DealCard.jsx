import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DealCard = ({ deal, index }) => (
  <Draggable draggableId={deal._id} index={index}>
    {(provided) => (
      <div
        className="deal-card"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        <strong>{deal.title}</strong><br />
        💰 ${deal.value}<br />
        👤 {deal.customer}
      </div>
    )}
  </Draggable>
);

export default DealCard;
