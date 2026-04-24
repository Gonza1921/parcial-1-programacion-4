class NotFoundException(Exception):
    """Excepción cuando un recurso no existe"""
    pass


class ValidationException(Exception):
    """Excepción para errores de validación de negocio"""
    pass
