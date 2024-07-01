import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { User, MagnifyingGlass, Calendar, Phone } from "@medusajs/icons"
import { Tooltip } from "@medusajs/ui"


import WishListPopover from "@modules/wishlist/templates/drop-down"
import FavButton from "@modules/layout/components/fav-button"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group border-t-4 border-t-[#c4dae2]">
      <header className="relative h-20 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-start">
              <SideMenu regions={regions} />
              <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink className="text-sm hover:text-ui-fg-base" href="tel:+18582307042" data-testid="nav-account-link">
                <Tooltip className="z-50 data-[side=right]" content="858.230.7042">
                  <Phone />
                </Tooltip>
              </LocalizedClientLink>
              <LocalizedClientLink className="hover:text-ui-fg-base" href="/account" data-testid="nav-account-link">
                <Calendar />
              </LocalizedClientLink>
              </div>
            </div>
          </div>

          <div className="flex items-center h-full px-8">
            <LocalizedClientLink href="/" className="" data-testid="nav-store-link">
              <Image width={130} height={40} objectFit="contain" className="w-auto" src="https://ws-storefront.s3.us-west-1.amazonaws.com/assets/img/william-and-sons-jewelers.png" alt="" />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink className="hover:text-ui-fg-base" href="/search" scroll={false} data-testid="nav-search-link">
                  <MagnifyingGlass />
                </LocalizedClientLink>
              )}

              <Suspense
                fallback={
                  <LocalizedClientLink className="hover:text-ui-fg-base flex gap-2" href="/cart">
                    Wishlist (0)
                  </LocalizedClientLink>
                }>
                <FavButton />
              </Suspense>

              <LocalizedClientLink className="hover:text-ui-fg-base" href="/account" data-testid="nav-account-link">
                <User />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink className="hover:text-ui-fg-base flex gap-2" href="/cart" data-testid="nav-cart-link">
                  Cart (0)
                </LocalizedClientLink>
              }>
              <CartButton />
            </Suspense>
            
          </div>
        </nav>
      </header>
    </div>
  )
}
