
import { Badge } from "components/ui/badge"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightMini } from "@medusajs/icons"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="h-[20vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            William & Sons Jewelers
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            v.2
          </Heading>
        </span>

        <div className="flex justify-between gap-2">


        <LocalizedClientLink className="hover:text-ui-fg-base" href="/store" data-testid="nav-account-link">
          <Button variant="secondary">All Products</Button>
        </LocalizedClientLink>




        <Badge className="not-prose w-fit" variant="outline">
          <Link
            className="group flex items-center gap-1"
            href=""
          >
            Contact Support
            <ChevronRightMini className="w-4 transition-all group-hover:-rotate-45" />
          </Link>
        </Badge>

        </div>
      </div>
    </div>
  )
}

export default Hero
