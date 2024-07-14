import Knex from 'knex';
import configs from '../../knexfile';

export const database = Knex(configs);