/**
 * Base class for Swibly API modules.
 *
 * @class
 * @protected
 */
class GenericModule {
  /**
   * Creates an instance of GenericModule.
   *
   * @param {string} __key - The API key.
   * @memberof GenericModule
   */
  constructor(private __key: string) {}

  /**
   * Gets the API key.
   *
   * @readonly
   * @type {string}
   * @memberof GenericModule
   */
  protected get key(): string {
    return this.__key;
  }
}
