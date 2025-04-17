# Design Patterns Implementados no Backend

Este documento descreve as implementações de padrões de design utilizados no backend do sistema SuppliFIT.

## Factory Method

O padrão Factory Method foi implementado para criar diferentes tipos de lojas parceiras (regular, premium, enterprise) de forma flexível e extensível.

### Localização: `partner_stores/services/store_factory.py`

### Estrutura:
- **StoreCreator**: Classe principal que atua como fábrica, decidindo qual tipo de criador concreto utilizar
- **RegularStoreCreator**: Criador concreto para lojas regulares
- **PremiumStoreCreator**: Criador concreto para lojas premium
- **EnterpriseStoreCreator**: Criador concreto para lojas enterprise

### Funcionamento:
```python
# Cliente utiliza o método Factory
store_type = data.get('store_type', 'regular')
store = StoreCreator.create_store(store_type, data, owner)
```

### Vantagens:
1. **Encapsulamento**: A lógica de criação fica isolada em classes especializadas
2. **Extensibilidade**: Adicionar novos tipos de lojas requer apenas criar um novo criador concreto
3. **Manutenção**: Mudanças nos requisitos de um tipo específico de loja afetam apenas sua classe correspondente

## Strategy Pattern

O padrão Strategy foi implementado para calcular comissões de vendas de maneira diferente para cada tipo de loja.

### Localização: `partner_stores/services/commission_strategy.py`

### Estrutura:
- **CommissionStrategy**: Interface abstrata que define o contrato para cálculo de comissões
- **RegularCommissionStrategy**: Estratégia para lojas regulares (taxa fixa)
- **PremiumCommissionStrategy**: Estratégia para lojas premium (descontos por volume)
- **EnterpriseCommissionStrategy**: Estratégia para lojas enterprise (com cap mensal)
- **CommissionContext**: Contexto que seleciona e utiliza a estratégia apropriada

### Funcionamento:
```python
# Cliente usa o contexto para calcular comissão
commission = CommissionContext.calculate_commission(store, sale_amount)
```

### Vantagens:
1. **Flexibilidade**: Comportamentos diferentes para cada tipo de loja sem uso de condicionais complexos
2. **Desacoplamento**: As estratégias são independentes entre si e do contexto que as utiliza
3. **Extensibilidade**: Novas estratégias podem ser adicionadas sem modificar o código existente

## Singleton Pattern

O padrão Singleton foi implementado em duas classes principais para gerenciar recursos compartilhados: conexões de banco de dados e logs.

### 1. Database Connection Singleton

#### Localização: `core/db_connection.py`

#### Estrutura:
- **DatabaseConnection**: Classe implementando o padrão Singleton para acesso ao banco
  - Métodos para executar consultas SQL
  - Contadores e estatísticas de uso
  - Thread-safe com uso de lock
  - Integração com LoggerManager

#### Funcionamento:
```python
# Obter instância do Singleton
db = DatabaseConnection.get_instance()
# Usar a conexão
data = db.execute_raw_sql("SELECT * FROM tabela WHERE id = %s", [id])
```

#### Vantagens:
1. **Consistência**: Compartilhamento de uma única instância em toda a aplicação
2. **Controle de recursos**: Evita múltiplas conexões desnecessárias ao banco
3. **Centralização**: Permite centralizar estatísticas e monitoramento de operações

### 2. Logger Manager Singleton

#### Localização: `core/db_connection.py`

#### Estrutura:
- **LoggerManager**: Classe implementando o padrão Singleton para gerenciamento de logs
  - Métodos para diferentes níveis de log (info, error, warning, critical, debug)
  - Configuração centralizada do sistema de logs
  - Handlers para arquivos e console
  - Estatísticas de uso

#### Funcionamento:
```python
# Obter instância do Singleton
logger = LoggerManager.get_instance()
# Registrar um evento
logger.info("Operação concluída com sucesso", extra={"user_id": user_id})
logger.error("Falha na operação", extra={"error_code": 1001})
```

#### Vantagens:
1. **Configuração centralizada**: Define uma única vez todos os parâmetros de logging
2. **Consistência**: Garante formato e armazenamento padronizados para todos os logs
3. **Desacoplamento**: Outras classes utilizam a interface do logger sem conhecer detalhes de implementação
4. **Rastreabilidade**: Facilita o monitoramento e diagnóstico de problemas

#### Integração com Database Connection:
O LoggerManager é utilizado pelo DatabaseConnection para:
- Registrar todas as queries executadas
- Logar erros de banco de dados
- Incluir estatísticas de logs nos relatórios de uso do banco

## Integração no Sistema

Os padrões foram integrados em diversos componentes do sistema:

### Models (`partner_stores/models.py`):
- Campos adicionados para suportar os diferentes tipos de lojas:
  - `store_type` (regular, premium, enterprise)
  - `commission_rate` (taxa base de comissão)
  - `featured` (destaque para lojas premium e enterprise)
  - `priority_support` (para lojas enterprise)

### Service (`partner_stores/services/store_service.py`):
- Método `create_store` modificado para usar o Factory Method
- Adicionado método `calculate_sale_commission` que utiliza o Strategy Pattern

### Views (`partner_stores/views.py`):
- `PartnerStoreView`: Utiliza o Factory Method para criar lojas e o Singleton para acessar o banco
- `StoreCommissionView`: Utiliza o Strategy Pattern para calcular comissões

### URLs (`partner_stores/urls.py`):
- Endpoints específicos para cada funcionalidade:
  - `/api/v2/stores/` (Factory Method)
  - `/api/v2/stores/<id>/commission/` (Strategy Pattern)

## Conclusão

A implementação destes padrões de design traz diversos benefícios:

1. **Código mais limpo e organizado**: Cada padrão tem sua responsabilidade específica
2. **Facilidade de manutenção**: Alterações em um componente não afetam os outros
3. **Extensibilidade**: Novos tipos e comportamentos podem ser adicionados facilmente
4. **Testabilidade**: Classes com responsabilidades únicas são mais fáceis de testar

Estes padrões seguem os princípios SOLID de desenvolvimento de software, tornando o código mais robusto e adaptável a mudanças futuras. 