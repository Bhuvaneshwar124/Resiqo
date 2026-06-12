from app.services.ai_client import ai_client
from app.utils.prompts import ANALYSIS_PROMPT, FullAnalysisReport
import json

class AnalyzerService:
    @staticmethod
    def run_full_analysis(parsed_data: dict) -> FullAnalysisReport:
        """
        Runs the full STAR, ATS, and Impact analysis on the parsed resume data.
        """
        parsed_json_str = json.dumps(parsed_data, indent=2)
        prompt = ANALYSIS_PROMPT.format(parsed_data=parsed_json_str)
        
        # We ask Gemini to generate the structured FullAnalysisReport
        return ai_client.generate_structured_data(prompt, FullAnalysisReport)

analyzer_service = AnalyzerService()
