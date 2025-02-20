const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function analyzeGoals(goals: string[]) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "당신은 목표 설정과 실행 계획을 분석하는 전문가입니다. SMART 기준(Specific, Measurable, Achievable, Relevant, Time-bound)에 따라 목표를 평가하고 구체적인 피드백을 제공해주세요."
        }, {
          role: "user",
          content: `다음 목표들을 분석해주세요:\n${goals.join('\n')}`
        }]
      })
    });

    const data = await response.json();
    
    // AI 응답을 구조화된 형태로 파싱
    const analysis = parseAIResponse(data.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('OpenAI API 호출 중 오류:', error);
    throw error;
  }
}

function parseAIResponse(response: string) {
  // 실제 구현에서는 AI 응답을 적절히 파싱해야 함
  return {
    feasibility: "실현 가능한 목표입니다.",
    feedback: "목표가 구체적이고 측정 가능하게 설정되어 있습니다.",
    suggestions: [
      "시간 계획을 더 구체적으로 설정해보세요.",
      "중간 점검 지표를 추가하면 좋을 것 같습니다.",
      "각 목표의 우선순위를 설정해보세요."
    ]
  };
} 