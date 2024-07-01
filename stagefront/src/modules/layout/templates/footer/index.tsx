import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import WSCTA from "@modules/layout/components/ws-cta"
import Image from "next/image"
import { Separator } from "components/ui/separator"


export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-8">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
                <Image
                  width={160}
                  height={48}

                  className="w-auto"
                  src="https://ws-storefront.s3.us-west-1.amazonaws.com/assets/img/william-and-sons-jewelers.png"
                  alt=""
                />
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4">
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">About</span>
              <ul className="grid grid-cols-1 gap-y-1 text-ui-fg-subtle txt-small">
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Our Story</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Business Hours</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Conflict-free Sourcing</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Recycled Metals</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Reviews</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Affiliates</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Orders</span>
              <ul className="grid grid-cols-1 gap-y-1 text-ui-fg-subtle txt-small">
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Order Status</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Resizing</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Free Lifetime Warranty</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Free Shipping</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">Financing</a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="" className="hover:text-ui-fg-base">FAQ</a>
                </li>
              </ul>
            </div>
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-0" data-testid="footer-categories">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-1 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-1">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-1 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
        <Separator className="my-4" />

        <div className="flex w-full mb-4 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} William & Sons Jewelers.
          </Text>
          <WSCTA />
        </div>
      </div>
      <div className="bg-[radial-gradient(closest-side,#BDD5DD,#2563eb,transparent)] h-[0.25rem]"></div>
    </footer>
  )
}
