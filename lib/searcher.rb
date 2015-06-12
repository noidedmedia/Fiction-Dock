class Searcher
  def initialize(hsh)
    @hash = hsh
    @ships = @hash["ships"]

    prep_ships
  end

  def resolve

  end

  protected
  def prep_ships
    @ships.map!{|id_list| id_list.split(",").map(&:to_i)}
  end
end
