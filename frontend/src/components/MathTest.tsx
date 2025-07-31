import React from 'react';

// Test component to demonstrate KaTeX math formula rendering
const MathTest = () => {
  const sampleContent = `**Net Effective Rent (NER)**
- **Definition**: The effective rent after accounting for concessions.
- **Calculation**:
\\[
\\text{NER} = \\text{Rent} - \\left(\\text{Recurring Concessions} + \\left(\\frac{\\text{One-Time Concessions}}{12}\\right)\\right) / \\text{Total Units}
\\]

This formula shows how to calculate the Net Effective Rent by subtracting concessions from the base rent.`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Math Formula Rendering Test</h1>
      <div className="prose max-w-none">
        <pre className="bg-gray-100 p-4 rounded mb-4 text-sm overflow-x-auto">
          {sampleContent}
        </pre>
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Rendered Output:</h2>
          <div className="bg-gray-50 p-4 rounded">
            {/* This would be rendered by the RichTextContent component */}
            <div className="font-normal text-base leading-6">
              <div><strong>Net Effective Rent (NER)</strong></div>
              <div>- <strong>Definition</strong>: The effective rent after accounting for concessions.</div>
              <div>- <strong>Calculation</strong>:</div>
              <div className="my-4 text-center">
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '1.1em',
                  textAlign: 'center',
                  padding: '1rem',
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  margin: '1rem 0',
                  color: '#333'
                }}>
                  NER = Rent - (Recurring Concessions + (One-Time Concessions/12)) / Total Units
                </div>
              </div>
              <div>This formula shows how to calculate the Net Effective Rent by subtracting concessions from the base rent.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathTest; 