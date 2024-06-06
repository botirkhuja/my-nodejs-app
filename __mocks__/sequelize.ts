const Sequelize = jest.genMockFromModule<{
  Sequelize: jest.Mock;
  DataTypes: {
    STRING: string;
    INTEGER: string;
  };
}>('sequelize');

const mockSequelize = {
  authenticate: jest.fn().mockResolvedValue(true),
  define: jest.fn().mockReturnValue({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    sync: jest.fn(),
  }),
};

Sequelize.Sequelize = jest.fn(() => mockSequelize);
Sequelize.DataTypes = {
  STRING: 'STRING',
  INTEGER: 'INTEGER',
};

module.exports = Sequelize;