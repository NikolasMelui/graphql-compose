import {
  DocumentNode,
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLNamedType,
  GraphQLType,
  GraphQLObjectType,
} from 'graphql';
import { SchemaComposer, AnyComposeType, AnyType } from './SchemaComposer';
import { ComposeInputFieldConfig, ComposeInputFieldConfigMap } from './InputTypeComposer';
import {
  ObjectTypeComposer,
  ComposeArgumentConfig,
  ComposeFieldConfig,
  ComposeFieldConfigArgumentMap,
  ComposeFieldConfigMap,
  ComposeObjectType,
} from './ObjectTypeComposer';
import { TypeDefinitionString, TypeNameString, TypeWrappedString } from './TypeMapper';
import { TypeStorage } from './TypeStorage';

/**
 * Eg. `type Name { field: Int }`
 */
export type TypeDefinitionString = string;

/**
 * Eg. `Int`, `Int!`, `[Int]`
 */
export type TypeWrappedString = string;

/**
 * Eg. `Int`, `Float`
 */
export type TypeNameString = string;

export type TypeAsString = TypeDefinitionString | TypeWrappedString | TypeNameString;

/**
 * Type storage and type generator from `Schema Definition Language` (`SDL`).
 * This is slightly rewritten [buildASTSchema](https://github.com/graphql/graphql-js/blob/master/src/utilities/buildASTSchema.js)
 * utility from `graphql-js` that allows to create type from a string (SDL).
 */
declare class TypeMapper<TContext> {
  public schemaComposer: SchemaComposer<TContext>;
  protected basicScalars: Map<string, GraphQLNamedType>;

  public constructor(schemaComposer: SchemaComposer<TContext>);

  public get(name: string): GraphQLNamedType | void;

  public set(name: string, type: AnyType<any>): void;

  public has(name: string): boolean;

  public getWrapped(str: TypeWrappedString | TypeNameString): GraphQLType | null;

  public createType(str: TypeDefinitionString): AnyComposeType<TContext> | void;

  public createGraphQLType(str: TypeDefinitionString): GraphQLType | void;

  public parseTypesFromString(str: string): TypeStorage<string, AnyComposeType<TContext>>;

  public parseTypesFromAst(astDocument: DocumentNode): TypeStorage<string, GraphQLNamedType>;

  public convertOutputType(composeType: ComposeObjectType): GraphQLObjectType;

  public convertOutputFieldConfig<TSource = any, TContext = any>(
    composeFC: ComposeFieldConfig<TSource, TContext>,
    fieldName?: string,
    typeName?: string
  ): GraphQLFieldConfig<TSource, TContext>;

  public convertOutputFieldConfigMap<TSource = any, TContext = any>(
    composeFields:
      | ComposeFieldConfigMap<TSource, TContext>
      | GraphQLFieldConfigMap<TSource, TContext>,
    typeName?: string
  ): GraphQLFieldConfigMap<TSource, TContext>;

  public convertArgConfig(
    composeAC: ComposeArgumentConfig,
    argName?: string,
    fieldName?: string,
    typeName?: string
  ): GraphQLArgumentConfig;

  public convertArgConfigMap(
    composeArgsConfigMap: ComposeFieldConfigArgumentMap<any>,
    fieldName?: string,
    typeName?: string
  ): GraphQLFieldConfigArgumentMap;

  public convertInputFieldConfig(
    composeIFC: ComposeInputFieldConfig,
    fieldName?: string,
    typeName?: string
  ): GraphQLInputFieldConfig;

  public convertInputFieldConfigMap(
    composeFields: ComposeInputFieldConfigMap,
    typeName?: string
  ): GraphQLInputFieldConfigMap;

  /**
   * -----------------------------------------------
   * Internal methods
   * -----------------------------------------------
   */
}
