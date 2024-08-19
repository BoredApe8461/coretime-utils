import { BN } from '@polkadot/util';
import { RawRegionId } from './types';
import { RegionId } from './region';

export * from './coreMask';
export * from './region';
export * from './types';

/**
 * Encodes the `regionId` into a BigNumber (BN) format. This is used for interacting
 * with the xc-regions contract or when conducting cross-chain transfers, where
 * `regionId` needs to be represented as a u128.
 *
 * @param api The API object used to encode the regionId fields.
 * @returns The encoded regionId as a BigNumber (BN)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEncodedRegionId(regionId: RegionId, api: any): RawRegionId {
  const encodedBegin = api.createType('u32', regionId.begin).toHex().substring(2);
  const encodedCore = api.createType('u16', regionId.core).toHex().substring(2);

  const rawRegionId = encodedBegin + encodedCore + regionId.mask.substring(2);

  return new BN(rawRegionId, 16);
}
