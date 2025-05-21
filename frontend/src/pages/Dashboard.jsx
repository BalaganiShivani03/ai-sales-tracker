import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PipelineColumn from '../components/PipelineColumn';
import AIInsightsPanel from '../components/AIInsightsPanel';
import { getDeals, updateDeal, createDeal } from '../services/dealService';
import { getAIRecommendations } from '../services/aiService';

const stages = ['Lead', 'Contacted', 'Qualified', 'Negotiation', 'Won', 'Lost'];

function Dashboard() {
  const [deals, setDeals] = useState([]);
  const [suggestions, setSuggestions] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    value: '',
    stage: 'Lead',
    customer: ''
  });

  // Fetch deals on initial load
  useEffect(() => {
    async function fetchDeals() {
      const data = await getDeals();
      setDeals(data);
    }
    fetchDeals();
  }, []);

  // Handle drag-and-drop stage update
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedDeals = [...deals];
    const movedDeal = updatedDeals.find(deal => deal._id === draggableId);
    movedDeal.stage = destination.droppableId;

    await updateDeal(draggableId, { stage: destination.droppableId });
    setDeals(updatedDeals);
  };

  // Fetch AI suggestions based on current deal state
  const refreshAI = async () => {
    setLoadingAI(true);
    try {
      const res = await getAIRecommendations(deals);
      setSuggestions(res.suggestions);
    } catch (err) {
      setSuggestions("⚠️ Failed to fetch AI suggestions.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Create new deal and update board
  const handleCreateDeal = async (e) => {
    e.preventDefault();
    try {
      const created = await createDeal({
        ...newDeal,
        value: Number(newDeal.value)
      });
      setDeals(prev => [...prev, created]);
      setNewDeal({ title: '', value: '', stage: 'Lead', customer: '' });
    } catch (err) {
      alert("❌ Failed to create deal");
    }
  };

  const groupByStage = (stage) => deals.filter(deal => deal.stage === stage);

  return (
    <div>
      {/* Create New Deal Form */}
      <div className="deal-form-container">
        <h3>Create New Deal</h3>
        <form onSubmit={handleCreateDeal}>
          <input
            placeholder="Title"
            value={newDeal.title}
            onChange={e => setNewDeal({ ...newDeal, title: e.target.value })}
            required
          />
          <input
            placeholder="Value"
            type="number"
            value={newDeal.value}
            onChange={e => setNewDeal({ ...newDeal, value: e.target.value })}
            required
          />
          <input
            placeholder="Customer"
            value={newDeal.customer}
            onChange={e => setNewDeal({ ...newDeal, customer: e.target.value })}
            required
          />
          <select
            value={newDeal.stage}
            onChange={e => setNewDeal({ ...newDeal, stage: e.target.value })}
          >
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <button type="submit">➕ Add</button>
        </form>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '10px', padding: '0 20px 20px', overflowX: 'auto' }}>
          {stages.map(stage => (
            <PipelineColumn
              key={stage}
              columnId={stage}
              title={stage}
              deals={groupByStage(stage)}
            />
          ))}
        </div>
      </DragDropContext>

      {/* AI Insights */}
      <div style={{ padding: '20px' }}>
        <AIInsightsPanel
          suggestions={loadingAI ? "⏳ Generating AI insights..." : suggestions}
          onRefresh={refreshAI}
        />
      </div>
    </div>
  );
}

export default Dashboard;
