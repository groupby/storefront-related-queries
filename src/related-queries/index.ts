import { utils, view, Component, Events, Store } from '@storefront/core';

@view('gb-related-queries', require('./index.html'))
class RelatedQueries extends Component {

  state: RelatedQueries.State = {
    relatedQueries: []
  };

  constructor() {
    super();
    this.expose('relatedQueries');

    this.flux.on(Events.RELATED_QUERIES_UPDATED, this.updateRelatedQueries);
  }

  updateRelatedQueries = (relatedQueries: Store.Linkable[]) =>
    !(relatedQueries.length === 0 && this.state.relatedQueries.length === 0)
    && this.set({ relatedQueries: utils.mapToSearchActions(relatedQueries, this.flux) })
}

namespace RelatedQueries {
  export interface State {
    relatedQueries: Store.Linkable[];
  }
}

export default RelatedQueries;
