# logic adapter for computer tasks

from chatterbot.logic import LogicAdapter

class ComputerAdapter(LogicAdapter):

    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)

    def can_process(self, statement):
        return True

    def process(self, input_statement, additional_response_selection_parameters):
        rtn = "Not yet implemented"
        return rtn