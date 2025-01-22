import { type SchemaTypeDefinition } from 'sanity'
import { Category } from './category'
import { product } from './product'
import  order  from './order'
import customer from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Category, product, order, customer],
}
