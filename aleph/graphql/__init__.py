import graphene


class Query(graphene.ObjectType):
    hello = graphene.String(description='A typical hello world')

    def resolve_hello(self, info):
        print dir(info)
        print info.fragments
        return 'World'


schema = graphene.Schema(query=Query)
