from django.db import connection
from typing import Optional, Dict, Any, List
import threading
import logging
import datetime
import os
import json

class LoggerManager:
    """
    Singleton para gerenciar logs da aplicação
    """
    _instance: Optional['LoggerManager'] = None
    _lock = threading.Lock()
    
    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(LoggerManager, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
            
        self._initialized = True
        
        # Configurar logger principal
        self.logger = logging.getLogger('supplift')
        self.logger.setLevel(logging.INFO)
        
        # Garantir que o diretório de logs existe
        log_dir = 'logs'
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        
        # Handler para arquivo
        file_handler = logging.FileHandler(
            os.path.join(log_dir, f'app_{datetime.datetime.now().strftime("%Y%m%d")}.log')
        )
        file_handler.setLevel(logging.INFO)
        
        # Handler para console
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.WARNING)
        
        # Formato do log
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        # Adicionar handlers
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
        
        # Contadores para estatísticas
        self.log_counts = {
            'info': 0,
            'warning': 0,
            'error': 0,
            'critical': 0,
            'debug': 0
        }
    
    def info(self, message: str, extra: Dict[str, Any] = None):
        """Registra mensagem de informação"""
        self.log_counts['info'] += 1
        self.logger.info(message, extra=extra)
    
    def warning(self, message: str, extra: Dict[str, Any] = None):
        """Registra mensagem de aviso"""
        self.log_counts['warning'] += 1
        self.logger.warning(message, extra=extra)
    
    def error(self, message: str, extra: Dict[str, Any] = None):
        """Registra mensagem de erro"""
        self.log_counts['error'] += 1
        self.logger.error(message, extra=extra)
    
    def critical(self, message: str, extra: Dict[str, Any] = None):
        """Registra mensagem crítica"""
        self.log_counts['critical'] += 1
        self.logger.critical(message, extra=extra)
    
    def debug(self, message: str, extra: Dict[str, Any] = None):
        """Registra mensagem de debug"""
        self.log_counts['debug'] += 1
        self.logger.debug(message, extra=extra)
    
    def log_db_query(self, query: str, params: List = None):
        """Registra uma consulta ao banco de dados"""
        self.info(
            f"Executando query SQL", 
            extra={
                'query': query,
                'params': json.dumps(params) if params else None
            }
        )
    
    def get_stats(self):
        """Retorna estatísticas de logs"""
        return self.log_counts
    
    @classmethod
    def get_instance(cls) -> 'LoggerManager':
        """Método para obter a instância do Singleton"""
        if cls._instance is None:
            return cls()
        return cls._instance


class DatabaseConnection:
    """
    Singleton para gerenciar conexões com o banco de dados
    """
    _instance: Optional['DatabaseConnection'] = None
    _lock = threading.Lock()
    
    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseConnection, cls).__new__(cls)
                cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
            
        self._initialized = True
        self._connection = connection
        self.connection_attempts = 0
        self.queries_executed = 0
        # Integração com o LoggerManager
        self.logger = LoggerManager.get_instance()
    
    def execute_raw_sql(self, sql: str, params=None):
        """Executa uma query SQL diretamente"""
        self.logger.log_db_query(sql, params)
        with self._connection.cursor() as cursor:
            try:
                cursor.execute(sql, params or [])
                self.queries_executed += 1
                result = cursor.fetchall()
                self.logger.info(f"Query executada com sucesso: {self.queries_executed} queries executadas no total")
                return result
            except Exception as e:
                self.logger.error(f"Erro ao executar query: {str(e)}", extra={'sql': sql})
                raise
    
    def execute_raw_update(self, sql: str, params=None):
        """Executa uma query de atualização SQL diretamente"""
        self.logger.log_db_query(sql, params)
        with self._connection.cursor() as cursor:
            try:
                cursor.execute(sql, params or [])
                self.queries_executed += 1
                rowcount = cursor.rowcount
                self.logger.info(f"Update executado com sucesso: {rowcount} linhas afetadas")
                return rowcount
            except Exception as e:
                self.logger.error(f"Erro ao executar update: {str(e)}", extra={'sql': sql})
                raise
    
    def reset_connection(self):
        """Fecha e reabre a conexão com o banco"""
        self._connection.close()
        self._connection = connection
        self.connection_attempts += 1
        self.logger.info(f"Conexão resetada. Total de resets: {self.connection_attempts}")
    
    def get_stats(self):
        """Retorna estatísticas de uso da conexão"""
        return {
            'connection_attempts': self.connection_attempts,
            'queries_executed': self.queries_executed,
            'is_usable': self._connection.is_usable(),
            'log_stats': self.logger.get_stats()
        }
    
    @classmethod
    def get_instance(cls) -> 'DatabaseConnection':
        """Método para obter a instância do Singleton"""
        if cls._instance is None:
            return cls()
        return cls._instance 