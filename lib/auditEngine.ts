export interface ToolEntry {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditResult {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  savings: number;
  reason: string;
}

export function runAudit(tools: ToolEntry[], teamSize: number, useCase: string): AuditResult[] {
  return tools.map(tool => {
    let savings = 0;
    let action = "No major savings";
    let reason = "Your plan looks reasonable.";

    const totalForTool = tool.monthlySpend;
    const perSeat = totalForTool / (tool.seats || 1);

    // Cursor Logic
    if (tool.tool === "Cursor") {
      if (tool.plan === "Business" && teamSize < 4) {
        savings = Math.floor(totalForTool * 0.45);
        action = "Downgrade to Pro";
        reason = `Business plan is overkill for ${teamSize} people. Pro plan is sufficient for most teams.`;
      } else if (tool.plan === "Pro" && perSeat > 25) {
        savings = Math.floor(totalForTool * 0.25);
        action = "Consider Credex credits";
        reason = "You can get Pro access cheaper through Credex bulk credits.";
      }
    } 
    // GitHub Copilot
    else if (tool.tool === "GitHub Copilot") {
      if (tool.plan === "Business" && teamSize < 5) {
        savings = Math.floor(totalForTool * 0.4);
        action = "Downgrade to Individual";
        reason = "Individual plan is more cost-effective for small teams.";
      }
    } 
    // Claude / ChatGPT
    else if (["Claude", "ChatGPT"].includes(tool.tool)) {
      if ((tool.plan === "Team" || tool.plan === "Enterprise") && teamSize <= 3) {
        savings = Math.floor(totalForTool * 0.35);
        action = "Switch to Pro/Plus";
        reason = "Team plan not justified for small team size.";
      }
    } 
    // API Heavy Users
    else if (tool.tool.includes("API")) {
      if (totalForTool > 150) {
        savings = Math.floor(totalForTool * 0.3);
        action = "Switch to Credex credits";
        reason = "Significant savings possible via Credex discounted API credits.";
      }
    }

    // Default fallback
    if (savings === 0) {
      savings = Math.floor(totalForTool * 0.15);
      action = "Minor optimization possible";
      reason = "Consider reviewing usage or exploring Credex for credits.";
    }

    return {
      tool: tool.tool,
      currentSpend: totalForTool,
      recommendedAction: action,
      savings: Math.max(savings, 0),
      reason
    };
  });
}