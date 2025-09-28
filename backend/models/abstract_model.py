from abc import ABC, abstractmethod


class AbstractModel(ABC):
    """
    Abstract base class for all models.
    Ensures consistent interface with execute() method for AI generation.
    """

    @abstractmethod
    def execute(self):
        """
        Execute the model logic to generate a recommendation text.

        Note: Subclasses may accept parameters (e.g., data) or use class attributes/internal state.
        No parameters are enforced in the abstract base.

        Returns:
            Generated result (type defined by subclass).
        """
        pass
