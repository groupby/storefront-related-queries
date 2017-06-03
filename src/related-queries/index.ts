import { alias, tag, utils, Events, Store, Tag } from '@storefront/core';

@alias('relatedQueries')
@tag('gb-related-queries', require('./index.html'))
class RelatedQueries {

  state: RelatedQueries.State = {
    relatedQueries: []
  };

  init() {
    this.flux.on(Events.RELATED_QUERIES_UPDATED, this.updateRelatedQueries);
  }

  updateRelatedQueries = (relatedQueries: Store.Linkable[]) =>
    !(relatedQueries.length === 0 && this.state.relatedQueries.length === 0)
    && this.set({ relatedQueries: utils.mapToSearchActions(relatedQueries, this.flux) })
}

interface RelatedQueries extends Tag<any, RelatedQueries.State> { }
namespace RelatedQueries {
  export interface State {
    relatedQueries: Store.Linkable[];
  }
}

export default RelatedQueries;
