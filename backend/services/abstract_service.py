from abc import ABC, abstractmethod


class AbstractService(ABC):
    """
    Abstract base class for all services.
    Ensures consistent interface with execute() method.
    Subclasses should define specific input/output types as needed.
    """

    @abstractmethod
    def execute(self):
        """
        Execute the service logic.

        Args:
            data: Input data for the service (type, presence, and method of passing defined by subclass).

        Returns:
            Processed result (type defined by subclass).
        """
        pass
