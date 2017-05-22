import { utils, Component, Events } from '@storefront/core';
import RelatedQueries from '../../src/related-queries';
import suite from './_suite';

suite('RelatedQueries', ({ expect, spy, stub }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.flux = <any>{ on: () => null };

      new RelatedQueries();

      expect(expose.calledWith('relatedQueries')).to.be.true;
    });

    it('should listen for RELATED_QUERIES_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };
      Component.prototype.expose = () => null;

      const relatedQueries = new RelatedQueries();

      expect(on.calledWith(Events.RELATED_QUERIES_UPDATED, relatedQueries.updateRelatedQueries)).to.be.true;
    });

    describe('state', () => {
      it('should set initial relatedQueries');
    });
  });

  describe('actions', () => {
    let relatedQueries: RelatedQueries;

    before(() => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };
    });
    after(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });
    beforeEach(() => relatedQueries = new RelatedQueries());

    describe('updateRelatedQueries()', () => {
      it('should set relatedQueries', () => {
        const related: any[] = ['a', 'b'];
        const searchActions = ['c', 'd'];
        const flux = relatedQueries.flux = <any>{ e: 'f' };
        const set = relatedQueries.set = spy();
        const mapToSearchActions = stub(utils, 'mapToSearchActions').returns(searchActions);
        relatedQueries.state = <any>{ relatedQueries: [] };

        relatedQueries.updateRelatedQueries(related);

        expect(set.calledWith({ relatedQueries: searchActions })).to.be.true;
        expect(mapToSearchActions.calledWith(related, flux)).to.be.true;
      });

      it('should not set relatedQueries if both empty', () => {
        relatedQueries.set = () => expect.fail();
        relatedQueries.state = <any>{ relatedQueries: [] };

        relatedQueries.updateRelatedQueries([]);
      });
    });
  });
});
