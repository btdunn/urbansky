import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("items");

  if (!tableExists) {
    await knex.schema.createTable('items', (item) => {
      item.increments('id').primary()
      item.integer('serial')
      item.string('name', 255)
      item.string('description', 255)
      item.integer('quantity')
      item.timestamp('created_at').defaultTo(knex.fn.now())
      // knex docs imply the below won't update automatically w/ pg. they cite an 8yr old stackoverflow post as a reference for details lol
      item.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('items')
}

